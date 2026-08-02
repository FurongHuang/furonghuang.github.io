import { parse } from "yaml";
import peopleYaml from "./people.yaml?raw";

export interface Person {
  name: string;
  role: string;
  period?: string;
  destination?: string;
  href?: string;
  image?: string;
  imagePosition?: string;
  imageScale?: number;
  onMarket?: boolean;
}

const optionalFields = ["period", "destination", "href", "image", "imagePosition"] as const;

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

function graduationYear(person: Person): number {
  const years = person.period?.match(/\b(?:19|20)\d{2}\b/g) ?? [];
  return years.length ? Math.max(...years.map(Number)) : 0;
}

export const postdocs = validateGroup(people.postdocs, "postdocs");
export const currentPhdStudents = validateGroup(people.current_phd_students, "current_phd_students");
export const alumni = validateGroup(people.alumni, "alumni").sort((left, right) => {
  const yearDifference = graduationYear(right) - graduationYear(left);
  return yearDifference || left.name.localeCompare(right.name, "en", { sensitivity: "base" });
});
