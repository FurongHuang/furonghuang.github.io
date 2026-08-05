#!/usr/bin/env python3
"""Create stable figure thumbnails for newly added arXiv publications.

Curated entries in research.yaml always win. For publications without a curated
visual, this script inspects the arXiv source and favors an overview, teaser, or
early paper figure. A designed title card is the final fallback; paper title
pages are intentionally never used as thumbnails.
"""

from __future__ import annotations

import argparse
import gzip
import hashlib
import io
import json
import re
import shutil
import subprocess
import tarfile
import tempfile
import textwrap
import urllib.request
from pathlib import Path

import yaml
from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS_PATH = ROOT / "src/data/publications.json"
RESEARCH_PATH = ROOT / "src/data/research.yaml"
GENERATED_PATH = ROOT / "src/data/publication-thumbnails.generated.json"
ASSET_DIR = ROOT / "public/assets/projects"
CARD_SIZE = (960, 600)


def arxiv_recency(work: dict) -> int:
    identifier = str(work.get("identifiers", {}).get("arxiv", ""))
    match = re.match(r"^(\d{2})(\d{2})\.(\d+)", identifier)
    if not match:
        return 0
    return int(f"{match.group(1)}{match.group(2)}{match.group(3).zfill(5)}")


def sorted_works(works: list[dict]) -> list[dict]:
    return sorted(
        works,
        key=lambda work: (
            int(work.get("year") or 0),
            arxiv_recency(work),
            work.get("title", ""),
        ),
        reverse=True,
    )


FIGURE_EXTENSIONS = (".pdf", ".png", ".jpg", ".jpeg", ".webp", ".eps")


def render_figure(source: Path, destination: Path) -> None:
    """Normalize a paper figure into the site's 16:10 thumbnail canvas."""
    magick = shutil.which("magick")
    if not magick:
        raise RuntimeError("ImageMagick's 'magick' command is required")

    with tempfile.TemporaryDirectory(prefix="publication-thumbnail-") as temp_dir:
        figure_path = Path(temp_dir) / "figure.png"
        source_spec = f"{source}[0]" if source.suffix.lower() in {".pdf", ".eps"} else str(source)
        subprocess.run(
            [
                magick,
                "-density",
                "180",
                source_spec,
                "-background",
                "white",
                "-alpha",
                "remove",
                "-trim",
                "+repage",
                str(figure_path),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        with Image.open(figure_path) as figure:
            figure = figure.convert("RGB")
            if figure.width < 180 or figure.height < 100:
                raise ValueError(f"figure is too small ({figure.width}x{figure.height})")
            # Preserve the figure's natural aspect ratio. The card layout owns
            # any necessary letterboxing; baking the figure into a fixed canvas
            # would make wide diagrams unnecessarily small.
            contained = ImageOps.contain(figure, (1200, 800), method=Image.Resampling.LANCZOS)
            border = 16
            thumbnail = Image.new(
                "RGB",
                (contained.width + border * 2, contained.height + border * 2),
                (247, 248, 246),
            )
            thumbnail.paste(contained, (border, border))
            thumbnail.save(destination, "WEBP", quality=90, method=6)


def normalize_existing_thumbnail(path: Path) -> bool:
    """Remove only a demonstrably uniform oversized margin from an asset."""
    with Image.open(path) as source:
        image = source.convert("RGB")
    width, height = image.size
    if width < 200 or height < 120:
        return False

    corners = [
        image.getpixel((0, 0)),
        image.getpixel((width - 1, 0)),
        image.getpixel((0, height - 1)),
        image.getpixel((width - 1, height - 1)),
    ]
    # Do not trim photographs or full-bleed illustrations whose corners do not
    # agree on a background color.
    spread = max(
        max(abs(a[channel] - b[channel]) for channel in range(3))
        for a in corners
        for b in corners
    )
    if spread > 24:
        return False

    background = tuple(
        sorted(corner[channel] for corner in corners)[len(corners) // 2]
        for channel in range(3)
    )
    difference = ImageChops.difference(image, Image.new("RGB", image.size, background))
    mask = difference.convert("L").point(lambda value: 255 if value > 20 else 0)
    bbox = mask.getbbox()
    if not bbox:
        return False
    left, top, right, bottom = bbox
    content_width = right - left
    content_height = bottom - top
    occupancy = content_width * content_height / (width * height)
    if occupancy >= 0.78 and content_width / width >= 0.86 and content_height / height >= 0.72:
        return False

    padding = max(10, round(min(content_width, content_height) * 0.035))
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(width, right + padding)
    bottom = min(height, bottom + padding)
    cropped = image.crop((left, top, right, bottom))
    save_options = {"quality": 90, "method": 6} if path.suffix.lower() == ".webp" else {}
    cropped.save(path, **save_options)
    return True


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf"),
        Path("/System/Library/Fonts/Helvetica.ttc"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def render_title_card(work: dict, destination: Path) -> None:
    """Create an elegant deterministic fallback when a paper preview is unavailable."""
    title = str(work.get("title") or "Publication")
    category = str(work.get("category") or "publication").upper()
    year = str(work.get("year") or "FORTHCOMING")
    digest = hashlib.sha256(title.encode("utf-8")).digest()
    palettes = [
        ((239, 249, 247), (15, 120, 118)),
        ((255, 244, 238), (205, 91, 64)),
        ((244, 241, 253), (100, 88, 177)),
        ((246, 247, 239), (137, 112, 42)),
    ]
    background, accent = palettes[digest[0] % len(palettes)]
    image = Image.new("RGB", CARD_SIZE, background)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((42, 42, 918, 558), radius=34, fill=(255, 253, 249), outline=accent, width=3)
    draw.ellipse((760, -90, 1035, 185), fill=(*accent,))
    draw.ellipse((-75, 455, 140, 670), outline=accent, width=18)
    draw.text((82, 78), f"{category}  ·  {year}", fill=accent, font=font(25, bold=True))

    title_font = font(45, bold=True)
    lines = textwrap.wrap(title, width=34, break_long_words=False, break_on_hyphens=False)
    if len(lines) > 5:
        lines = lines[:5]
        lines[-1] = lines[-1].rstrip(" .") + "…"
    line_height = 56
    start_y = 155 + max(0, (5 - len(lines)) * 16)
    for index, line in enumerate(lines):
        draw.text((82, start_y + index * line_height), line, fill=(16, 42, 67), font=title_font)
    draw.text((82, 510), "FURONG LAB  ·  UNIVERSITY OF MARYLAND", fill=(72, 101, 129), font=font(20, bold=True))
    image.save(destination, "WEBP", quality=88, method=6)


def download_arxiv_source(arxiv_id: str, destination: Path) -> None:
    request = urllib.request.Request(
        f"https://export.arxiv.org/e-print/{arxiv_id}",
        headers={"User-Agent": "Furong-Lab-publication-thumbnail-sync/1.0"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        destination.write_bytes(response.read())


def unpack_arxiv_source(archive_path: Path, destination: Path) -> None:
    """Unpack an arXiv source bundle without allowing path traversal."""
    raw = archive_path.read_bytes()
    destination.mkdir(parents=True, exist_ok=True)
    try:
        with tarfile.open(fileobj=io.BytesIO(raw), mode="r:*") as archive:
            for member in archive.getmembers():
                if not member.isfile():
                    continue
                target = (destination / member.name).resolve()
                if destination.resolve() not in target.parents:
                    continue
                target.parent.mkdir(parents=True, exist_ok=True)
                extracted = archive.extractfile(member)
                if extracted:
                    target.write_bytes(extracted.read())
            return
    except tarfile.TarError:
        pass

    try:
        raw = gzip.decompress(raw)
    except gzip.BadGzipFile:
        pass
    (destination / "main.tex").write_bytes(raw)


def strip_tex_comments(text: str) -> str:
    return re.sub(r"(?<!\\)%.*", "", text)


def resolve_figure_path(tex_path: Path, raw_path: str, source_root: Path) -> Path | None:
    cleaned = raw_path.strip().replace("\\detokenize{", "").rstrip("}")
    if any(token in cleaned for token in ("#", "\\", "{")):
        return None
    candidates = [tex_path.parent / cleaned, source_root / cleaned]
    for base in candidates:
        if base.suffix:
            if base.is_file() and base.suffix.lower() in FIGURE_EXTENSIONS:
                return base
        else:
            for extension in FIGURE_EXTENSIONS:
                candidate = base.with_suffix(extension)
                if candidate.is_file():
                    return candidate
    return None


def figure_candidates(source_root: Path) -> list[tuple[int, Path]]:
    """Return visual candidates ranked by paper order and editorial usefulness."""
    tex_files = list(source_root.rglob("*.tex"))
    tex_files.sort(
        key=lambda path: (
            0 if "\\documentclass" in path.read_text(encoding="utf-8", errors="ignore") else 1,
            len(path.parts),
            str(path),
        )
    )
    candidates: list[tuple[int, Path]] = []
    seen: set[Path] = set()
    figure_re = re.compile(r"\\begin\{figure\*?\}(.*?)\\end\{figure\*?\}", re.DOTALL)
    include_re = re.compile(r"\\includegraphics(?:\[[^]]*\])?\{([^}]+)\}")
    for tex_index, tex_path in enumerate(tex_files):
        text = strip_tex_comments(tex_path.read_text(encoding="utf-8", errors="ignore"))
        for figure_index, match in enumerate(figure_re.finditer(text)):
            block = match.group(1)
            lowered = block.lower()
            editorial_bonus = 0
            if any(word in lowered for word in ("teaser", "overview", "framework", "pipeline", "method")):
                editorial_bonus += 500
            if any(word in lowered for word in ("appendix", "ablation", "additional")):
                editorial_bonus -= 400
            for include_index, raw_path in enumerate(include_re.findall(block)):
                resolved = resolve_figure_path(tex_path, raw_path, source_root)
                if not resolved or resolved in seen:
                    continue
                seen.add(resolved)
                order_penalty = tex_index * 120 + figure_index * 18 + include_index * 2
                filename = resolved.stem.lower()
                filename_bonus = 350 if any(
                    word in filename for word in ("teaser", "overview", "framework", "pipeline", "method", "fig1", "figure1")
                ) else 0
                candidates.append((1000 + editorial_bonus + filename_bonus - order_penalty, resolved))

    # Some source bundles define figures through macros that evade the simple
    # parser. Large standalone visual files are a useful secondary pool.
    for path in source_root.rglob("*"):
        if path.is_file() and path.suffix.lower() in FIGURE_EXTENSIONS and path not in seen:
            filename = path.stem.lower()
            if any(word in filename for word in ("teaser", "overview", "framework", "pipeline", "method", "fig1", "figure1")):
                candidates.append((700, path))
    return sorted(candidates, key=lambda item: item[0], reverse=True)


def render_best_source_figure(source_root: Path, destination: Path) -> Path:
    errors = []
    for _, candidate in figure_candidates(source_root)[:16]:
        try:
            render_figure(candidate, destination)
            return candidate
        except Exception as error:
            errors.append(f"{candidate.name}: {error}")
    detail = "; ".join(errors[:3]) if errors else "no figure environments found"
    raise RuntimeError(detail)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--latest", type=int, default=12, help="inspect the newest N works")
    parser.add_argument("--all", action="store_true", help="inspect every publication")
    parser.add_argument("--ids", nargs="*", default=[], help="specific arXiv IDs to inspect")
    parser.add_argument("--check", action="store_true", help="report gaps without downloading")
    parser.add_argument("--strict", action="store_true", help="fail if a thumbnail cannot be generated")
    parser.add_argument(
        "--refresh-generated",
        action="store_true",
        help="replace existing generated arXiv thumbnails with selected paper figures",
    )
    parser.add_argument(
        "--normalize-existing",
        action="store_true",
        help="conservatively remove uniform oversized margins from assigned thumbnails",
    )
    args = parser.parse_args()

    publications = json.loads(PUBLICATIONS_PATH.read_text(encoding="utf-8"))
    research = yaml.safe_load(RESEARCH_PATH.read_text(encoding="utf-8")) or {}
    generated = (
        json.loads(GENERATED_PATH.read_text(encoding="utf-8"))
        if GENERATED_PATH.exists()
        else {}
    )
    curated = {
        item["title"]
        for item in research.get("publication_overrides", [])
        if item.get("title") and item.get("thumbnail")
    }
    broken_curated = [
        (title, path)
        for title, path in (
            (item["title"], item["thumbnail"])
            for item in research.get("publication_overrides", [])
            if item.get("title") and item.get("thumbnail")
        )
        if not (ROOT / "public" / path.lstrip("/")).is_file()
    ]
    if broken_curated:
        for title, path in broken_curated:
            print(f"Broken curated thumbnail: {path} - {title}")
        return 1

    if args.normalize_existing:
        assigned_paths = {
            ROOT / "public" / path.lstrip("/")
            for path in [
                *(item.get("thumbnail", "") for item in research.get("publication_overrides", [])),
                *generated.values(),
            ]
            if path
        }
        normalized = 0
        for path in sorted(assigned_paths):
            if path.is_file() and normalize_existing_thumbnail(path):
                normalized += 1
                print(f"Normalized thumbnail margins: {path.relative_to(ROOT)}")
        print(f"Normalized {normalized} assigned thumbnail(s).")

    generated = {
        title: path
        for title, path in generated.items()
        if (ROOT / "public" / path.lstrip("/")).is_file()
    }

    works = sorted_works(publications.get("works", []))
    if args.ids:
        requested = set(args.ids)
        candidates = [
            work
            for work in works
            if str(work.get("identifiers", {}).get("arxiv", "")) in requested
        ]
    elif args.all:
        candidates = works
    else:
        candidates = works[: max(args.latest, 0)]

    missing = [
        work
        for work in candidates
        if work.get("title") not in curated
        and (
            work.get("title") not in generated
            or (
                args.refresh_generated
                and work.get("identifiers", {}).get("arxiv")
            )
        )
    ]
    if not missing:
        print("Publication thumbnails are current for the inspected works.")
        return 0

    if args.check:
        for work in missing:
            identifier = work.get("identifiers", {}).get("arxiv", "no arXiv")
            print(f"Missing thumbnail: {identifier} - {work['title']}")
        return 1

    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    failures = []
    with tempfile.TemporaryDirectory(prefix="arxiv-figures-") as temp_dir:
        temp_root = Path(temp_dir)
        for work in missing:
            arxiv_id = str(work.get("identifiers", {}).get("arxiv", ""))
            source_id = arxiv_id or str(work.get("id") or work["title"])
            safe_id = re.sub(r"[^0-9a-z]+", "-", source_id.lower()).strip("-")[:72]
            asset_name = f"auto-{'arxiv-' if arxiv_id else ''}{safe_id}.webp"
            destination = ASSET_DIR / asset_name
            try:
                kind = "title card"
                if arxiv_id:
                    try:
                        archive_path = temp_root / f"{safe_id}.source"
                        source_root = temp_root / f"{safe_id}-source"
                        download_arxiv_source(arxiv_id, archive_path)
                        unpack_arxiv_source(archive_path, source_root)
                        selected = render_best_source_figure(source_root, destination)
                        kind = f"paper figure ({selected.name})"
                    except Exception as figure_error:
                        print(f"Figure warning: {arxiv_id} - {figure_error}; using title card")
                        render_title_card(work, destination)
                else:
                    render_title_card(work, destination)
                generated[work["title"]] = f"/assets/projects/{asset_name}"
                label = arxiv_id or "no arXiv"
                print(f"Generated {kind}: {label} -> {destination.relative_to(ROOT)}")
            except Exception as error:  # Keep routine CV refresh usable offline.
                label = arxiv_id or "no arXiv"
                failures.append((label, work["title"], str(error)))
                print(f"Thumbnail warning: {label} - {error}")

    GENERATED_PATH.write_text(
        json.dumps(dict(sorted(generated.items())), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    if failures and args.strict:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
