import type { CoverVariant, Discipline } from "./types";

type DisciplineMeta = {
  name: Discipline;
  code: string;
  description: string;
  cover: CoverVariant;
};

/** The areas where Apollo members can begin a project. */
export const DISCIPLINES: DisciplineMeta[] = [
  {
    name: "Computer Science",
    code: "CS",
    description: "Algorithms, systems, software, and the ideas underneath working technology.",
    cover: "interface",
  },
  {
    name: "Biology",
    code: "BIO",
    description: "Living systems, from cell behavior and field observations to analyzed results.",
    cover: "cells",
  },
  {
    name: "Chemistry",
    code: "CHEM",
    description: "Matter, reactions, and careful experiments that turn a hunch into evidence.",
    cover: "solid",
  },
  {
    name: "Mathematics",
    code: "MTH",
    description: "Proofs, models, and numerical methods written for the next person to follow.",
    cover: "curves",
  },
  {
    name: "Engineering",
    code: "ENG",
    description: "Devices and materials designed, built, and tested against real constraints.",
    cover: "mechanism",
  },
  {
    name: "Artificial Intelligence",
    code: "AI",
    description: "Models, interpretability, and systems that reason over messy real-world data.",
    cover: "matrix",
  },
  {
    name: "Environmental Science",
    code: "ENV",
    description: "Field measurement and long-horizon studies of local ecological systems.",
    cover: "terrain",
  },
  {
    name: "Robotics",
    code: "RBT",
    description: "Control, perception, and mechanisms for machines in the physical world.",
    cover: "interface",
  },
];

export const DISCIPLINE_MAP = new Map(DISCIPLINES.map((d) => [d.name, d]));

export function disciplineCode(name: Discipline): string {
  return DISCIPLINE_MAP.get(name)?.code ?? "APL";
}

export function coverVariantFor(name: Discipline): CoverVariant {
  return DISCIPLINE_MAP.get(name)?.cover ?? "interface";
}
