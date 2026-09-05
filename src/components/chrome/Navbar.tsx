"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { readSupabaseConfig } from "@/lib/supabase/env";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/team", label: "Team" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!readSupabaseConfig()) return;

    const supabase = createClient();
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (active) setSignedIn(Boolean(data.user));
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    if (!readSupabaseConfig()) return;

    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        scrolled || open
          ? "border-b border-hairline bg-void/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell-wide gutter flex h-14 items-center justify-between md:h-16">
        <Link
          href="/"
          className="rounded-sm transition-opacity duration-200 hover:opacity-80"
          aria-label="Apollo Labs — home"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-7">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 text-[0.8125rem] transition-colors duration-200 ${
                      active ? "text-paper" : "text-paper-dim hover:text-paper"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-signal transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 ${
                        active ? "origin-left scale-x-100" : ""
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle className="mr-1" />
          {signedIn ? (
            <>
              <button type="button" onClick={handleSignOut} className="link-reveal px-1 text-[0.8125rem] text-paper-dim transition-colors duration-200 hover:text-paper">
                Sign Out
              </button>
              <ButtonLink href="/dashboard" size="sm" className="ml-3">Dashboard</ButtonLink>
            </>
          ) : (
            <>
              <Link href="/signin" className="link-reveal px-1 text-[0.8125rem] text-paper-dim transition-colors duration-200 hover:text-paper">Sign In</Link>
              <ButtonLink href="/join" size="sm" className="ml-3">Join Apollo</ButtonLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
        <button
          type="button"
          className="flex size-11 items-center justify-center"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-full bg-paper transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-paper transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="gutter h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-hairline bg-void pb-10 pt-6 md:hidden"
      >
        <ul className="flex flex-col">
          {NAV.map((item) => (
            <li key={item.href} className="border-b border-hairline">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4"
              >
                <span
                  className={`text-xl font-medium tracking-[-0.01em] ${
                    isActive(item.href) ? "text-signal-text" : "text-paper"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          {signedIn ? (
            <>
              <ButtonLink href="/dashboard" onClick={() => setOpen(false)} className="w-full">Dashboard</ButtonLink>
              <button type="button" onClick={handleSignOut} className="h-11 border border-hairline-strong px-6 text-sm font-medium text-paper transition-colors hover:bg-paper/[0.04]">Sign Out</button>
            </>
          ) : (
            <>
              <ButtonLink href="/join" onClick={() => setOpen(false)} className="w-full">Join Apollo</ButtonLink>
              <ButtonLink href="/signin" onClick={() => setOpen(false)} variant="secondary" className="w-full">Sign In</ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
