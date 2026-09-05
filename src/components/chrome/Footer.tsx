import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/explore", label: "Explore" },
      { href: "/#work", label: "Selected Work" },
      { href: "/#disciplines", label: "Disciplines" },
    ],
  },
  {
    title: "Organization",
    links: [
      { href: "/about", label: "About" },
      { href: "/community", label: "Community" },
      { href: "/team", label: "Team" },
    ],
  },
  {
    title: "Participate",
    links: [
      { href: "/join", label: "Join Apollo" },
      { href: "/signin", label: "Sign In" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell-wide gutter py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo size={32} />
              <span className="flex items-baseline gap-[0.45em] text-sm font-medium uppercase leading-none tracking-[0.2em]">
                <span className="text-paper">Apollo</span>
                <span className="text-muted">Labs</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-muted">
              A student-led home for finished research, engineering, and software.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mono-label text-faint">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="link-reveal text-[0.9375rem] text-paper-dim transition-colors duration-200 hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-hairline pt-5">
          <p className="mono-label text-faint">Apollo Labs · Est. 2026</p>
        </div>
      </div>
    </footer>
  );
}
