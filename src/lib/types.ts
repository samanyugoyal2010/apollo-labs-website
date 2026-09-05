export type Discipline =
  | "Artificial Intelligence"
  | "Computer Science"
  | "Engineering"
  | "Biology"
  | "Environmental Science"
  | "Mathematics"
  | "Robotics";

export type ProjectType =
  | "Research Paper"
  | "Engineering"
  | "Software"
  | "Experiment";

export type ProjectStatus = "Published" | "In Review" | "In Progress";

export type Author = {
  name: string;
  role?: string;
  affiliation?: string;
};

export type Figure = {
  caption: string;
  /** Cover-art family reused as an inline figure visual. */
  variant: CoverVariant;
};

export type Section = {
  id: string;
  heading: string;
  body: string[];
  figure?: Figure;
};

export type CoverVariant =
  | "matrix"
  | "interface"
  | "cells"
  | "solid"
  | "terrain"
  | "curves"
  | "mechanism";

export type Project = {
  id: string;
  slug: string;
  title: string;
  authors: Author[];
  discipline: Discipline;
  type: ProjectType;
  status: ProjectStatus;
  year: number;
  date: string;
  featured: boolean;
  /** Real cover art, once projects supply it; falls back to generated. */
  coverImageUrl?: string;
  /** Editorial emphasis inside the gallery composition. */
  emphasis?: "featured" | "wide" | "standard";
  summary: string;
  abstract: string;
  tags: string[];
  readingTime: number;
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    video?: string;
  };
  content: Section[];
};
