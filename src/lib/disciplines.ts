import type { CoverVariant, Discipline } from "./types";

type DisciplineMeta = {
  name: Discipline;
  code: string;
  description: string;
  cover: CoverVariant;
};

export const DISCIPLINES: DisciplineMeta[] = [
  {
    name: "Artificial Intelligence",
    code: "AI",
    description:
      "Applied machine learning, model interpretability, and systems that reason over messy real-world data.",
    cover: "matrix",
  },
  {
    name: "Computer Science",
    code: "CS",
    description:
      "Algorithms, compilers, distributed systems, and the theory underneath working software.",
    cover: "interface",
  },
  {
    name: "Engineering",
    code: "ENG",
    description:
      "Mechanical, electrical, and materials work — designed, fabricated, and tested against real loads.",
    cover: "solid",
  },
  {
    name: "Biology",
    code: "BIO",
    description:
      "Molecular, cellular, and organismal investigation, from bench protocol to analyzed result.",
    cover: "cells",
  },
  {
    name: "Environmental Science",
    code: "ENV",
    description:
      "Field measurement, climate modeling, and long-horizon studies of local ecological systems.",
    cover: "terrain",
  },
  {
    name: "Mathematics",
    code: "MTH",
    description:
      "Pure and applied results, numerical methods, and proofs written to be read by other students.",
    cover: "curves",
  },
  {
    name: "Robotics",
    code: "RBT",
    description:
      "Control, perception, and mechanism design for machines that have to survive contact with the world.",
    cover: "mechanism",
  },
];

export const DISCIPLINE_MAP = new Map(DISCIPLINES.map((d) => [d.name, d]));

export function disciplineCode(name: Discipline): string {
  return DISCIPLINE_MAP.get(name)?.code ?? "APL";
}

export function coverVariantFor(name: Discipline): CoverVariant {
  return DISCIPLINE_MAP.get(name)?.cover ?? "interface";
}
