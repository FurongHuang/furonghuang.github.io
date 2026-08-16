import { parse } from "yaml";
import peopleYaml from "./people.yaml?raw";

export interface Person {
  name: string;
  role: string;
  researchFocus?: string;
  period?: string;
  location?: string;
  destination?: string;
  href?: string;
  image?: string;
  imagePosition?: string;
  imageScale?: number;
  onMarket?: boolean;
}

const optionalFields = ["researchFocus", "period", "location", "destination", "href", "image", "imagePosition"] as const;

function validateGroup(value: unknown, group: string): Person[] {
  if (!Array.isArray(value)) throw new Error(`people.yaml: ${group} must be a list`);

  return value.map((record, index) => {
    if (!record || typeof record !== "object") {
      throw new Error(`people.yaml: ${group}[${index}] must be an object`);
    }

    const person = record as Record<string, unknown>;
    if (typeof person.name !== "string" || typeof person.role !== "string") {
      throw new Error(`people.yaml: ${group}[${index}] requires string name and role fields`);
    }
    for (const field of optionalFields) {
      if (person[field] !== undefined && typeof person[field] !== "string") {
        throw new Error(`people.yaml: ${group}[${index}].${field} must be a string`);
      }
    }
    if (person.imageScale !== undefined && (typeof person.imageScale !== "number" || person.imageScale < 1 || person.imageScale > 3)) {
      throw new Error(`people.yaml: ${group}[${index}].imageScale must be a number from 1 to 3`);
    }
    if (person.onMarket !== undefined && typeof person.onMarket !== "boolean") {
      throw new Error(`people.yaml: ${group}[${index}].onMarket must be a boolean`);
    }
    return person as unknown as Person;
  });
}

const people = parse(peopleYaml) as Record<string, unknown>;

function yearsFromPeriod(person: Person): number[] {
  return (person.period?.match(/\b(?:19|20)\d{2}\b/g) ?? []).map(Number);
}

function startingYear(person: Person): number {
  return yearsFromPeriod(person)[0] ?? Number.MAX_SAFE_INTEGER;
}

function graduationYear(person: Person): number {
  const years = yearsFromPeriod(person);
  return years.length ? Math.max(...years) : 0;
}

function familyName(person: Person): string {
  const parts = person.name.replace(/\([^)]*\)/g, "").trim().split(/\s+/);
  return parts.at(-1) ?? person.name;
}

function compareByFamilyName(left: Person, right: Person): number {
  const familyDifference = familyName(left).localeCompare(familyName(right), "en", { sensitivity: "base" });
  return familyDifference || left.name.localeCompare(right.name, "en", { sensitivity: "base" });
}

function compareByDisplayName(left: Person, right: Person): number {
  return left.name.localeCompare(right.name, "en", { sensitivity: "base" });
}

export const postdocs = validateGroup(people.postdocs, "postdocs").sort(compareByFamilyName);
export const currentPhdStudents = validateGroup(people.current_phd_students, "current_phd_students").sort((left, right) => {
  const cohortDifference = startingYear(left) - startingYear(right);
  return cohortDifference || compareByDisplayName(left, right);
});
export const alumni = validateGroup(people.alumni, "alumni").sort((left, right) => {
  const yearDifference = graduationYear(right) - graduationYear(left);
  return yearDifference || compareByFamilyName(left, right);
});
