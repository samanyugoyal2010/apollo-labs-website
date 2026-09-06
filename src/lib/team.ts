export type Member = {
  name: string;
  role: string;
  group: "Founders" | "Engineering";
  focus: string;
};

/** Placeholder focus lines — replace with each member's own words. */
export const TEAM: Member[] = [
  {
    name: "Samanyu Goyal",
    role: "Co-Founder",
    group: "Founders",
    focus:
      "Works with members on scoping projects — turning a loose idea into something with a defined end.",
  },
  {
    name: "Ashmit Pai",
    role: "Co-Founder",
    group: "Founders",
    focus:
      "Sets the direction for what Apollo publishes and how projects are reviewed before they go out.",
  },
  {
    name: "Ricky Pagadala",
    role: "Co-Founder",
    group: "Founders",
    focus:
      "Runs outreach and partnerships, and connects members with mentors outside the organization.",
  },
  {
    name: "Rithvik Boyapati",
    role: "Head of Engineering",
    group: "Engineering",
    focus:
      "Owns the Apollo platform itself — the archive, the publication pipeline, and the tooling members build on.",
  },
];

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
