import { parse } from "yaml";
import peopleYaml from "./people.yaml?raw";

export interface Person {
  name: string;
  role: string;
  period?: string;
  destination?: string;
  href?: string;
  image?: string;
}

const optionalFields = ["period", "destination", "href", "image"] as const;

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
    return person as unknown as Person;
  });
}

const people = parse(peopleYaml) as Record<string, unknown>;

export const postdocs = validateGroup(people.postdocs, "postdocs");
export const currentPhdStudents = validateGroup(people.current_phd_students, "current_phd_students");
export const alumni = validateGroup(people.alumni, "alumni");
