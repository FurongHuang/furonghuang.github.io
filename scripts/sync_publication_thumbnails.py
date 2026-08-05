#!/usr/bin/env python3
"""Create stable fallback thumbnails for newly added arXiv publications.

Curated entries in research.yaml always win. For recent publications without a
curated visual, this script downloads the arXiv PDF and creates a readable
first-page preview. Generated mappings are kept separate from editorial data so
a better teaser can replace a fallback without changing the workflow.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import tempfile
import textwrap
import urllib.request
from pathlib import Path

import yaml
from PIL import Image, ImageDraw, ImageFont, ImageOps


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


def render_fallback(pdf_path: Path, destination: Path) -> None:
    magick = shutil.which("magick")
    if not magick:
        raise RuntimeError("ImageMagick's 'magick' command is required")

    with tempfile.TemporaryDirectory(prefix="publication-thumbnail-") as temp_dir:
        page_path = Path(temp_dir) / "page.png"
        subprocess.run(
            [
                magick,
                "-density",
                "130",
                f"{pdf_path}[0]",
                "-background",
                "white",
                "-alpha",
                "remove",
                str(page_path),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        with Image.open(page_path) as page:
            page = page.convert("RGB")
            width, height = page.size
            # Favor the title, abstract, and any first-page teaser while
            # producing the same 16:10 card ratio as curated project images.
            upper_page = page.crop((0, 0, width, int(height * 0.68)))
            thumbnail = ImageOps.fit(
                upper_page,
                CARD_SIZE,
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.38),
            )
            thumbnail.save(destination, "WEBP", quality=88, method=6)


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


def download_pdf(arxiv_id: str, destination: Path) -> None:
    request = urllib.request.Request(
        f"https://arxiv.org/pdf/{arxiv_id}",
        headers={"User-Agent": "Furong-Lab-publication-thumbnail-sync/1.0"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        destination.write_bytes(response.read())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--latest", type=int, default=12, help="inspect the newest N works")
    parser.add_argument("--all", action="store_true", help="inspect every publication")
    parser.add_argument("--ids", nargs="*", default=[], help="specific arXiv IDs to inspect")
    parser.add_argument("--check", action="store_true", help="report gaps without downloading")
    parser.add_argument("--strict", action="store_true", help="fail if a thumbnail cannot be generated")
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
        and work.get("title") not in generated
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
    with tempfile.TemporaryDirectory(prefix="arxiv-thumbnails-") as temp_dir:
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
                        pdf_path = temp_root / f"{safe_id}.pdf"
                        download_pdf(arxiv_id, pdf_path)
                        render_fallback(pdf_path, destination)
                        kind = "arXiv preview"
                    except Exception as preview_error:
                        print(f"Preview warning: {arxiv_id} - {preview_error}; using title card")
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
