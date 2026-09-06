"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { readSupabaseConfig } from "@/lib/supabase/env";

const NAV = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/team", label: "Team" },
];

const DISCORD_INVITE = "https://discord.gg/pvgqDxX2NE";
type AuthStatus = "loading" | "signed-in" | "signed-out";

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-[#5865F2]"
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.68 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.2 13.2 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128c-.598.35-1.22.648-1.873.892a.076.076 0 0 0-.04.107c.36.698.77 1.364 1.225 1.993a.076.076 0 0 0 .084.028 19.834 19.834 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.032-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.334-.956 2.419-2.157 2.419z" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() =>
    readSupabaseConfig() ? "loading" : "signed-out",
  );

  useEffect(() => {
    if (!readSupabaseConfig()) return;

    const supabase = createClient();
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (active) setAuthStatus(data.user ? "signed-in" : "signed-out");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthStatus(session?.user ? "signed-in" : "signed-out");
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
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
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
      <div className="shell-wide gutter flex h-14 items-center justify-between lg:h-16">
        <Link
          href="/"
          className="rounded-sm transition-opacity duration-200 hover:opacity-80"
          aria-label="Apollo Labs — home"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
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

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            size="sm"
            className="border-[#5865F2]/60 text-paper hover:border-[#5865F2] hover:bg-[#5865F2]/[0.08]"
          >
            <DiscordIcon />
            Discord
            <span className="sr-only"> (opens in a new tab)</span>
          </ButtonLink>
          {authStatus === "signed-in" ? (
            <>
              <button type="button" onClick={handleSignOut} className="link-reveal px-1 text-[0.8125rem] text-paper-dim transition-colors duration-200 hover:text-paper">
                Sign Out
              </button>
              <ButtonLink href="/dashboard" size="sm" className="ml-3">Dashboard</ButtonLink>
            </>
          ) : authStatus === "signed-out" ? (
            <>
              <Link href="/signin" className="link-reveal px-1 text-[0.8125rem] text-paper-dim transition-colors duration-200 hover:text-paper">Sign In</Link>
              <ButtonLink href="/join" size="sm" className="ml-3">Join Apollo</ButtonLink>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
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
        className="gutter h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-hairline bg-void pb-10 pt-6 lg:hidden"
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
          <ButtonLink
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            variant="secondary"
            className="w-full border-[#5865F2]/60 text-paper hover:border-[#5865F2] hover:bg-[#5865F2]/[0.08]"
          >
            <DiscordIcon />
            Discord
            <span className="sr-only"> (opens in a new tab)</span>
          </ButtonLink>
          {authStatus === "signed-in" ? (
            <>
              <ButtonLink href="/dashboard" onClick={() => setOpen(false)} className="w-full">Dashboard</ButtonLink>
              <button type="button" onClick={handleSignOut} className="h-11 border border-hairline-strong px-6 text-sm font-medium text-paper transition-colors hover:bg-paper/[0.04]">Sign Out</button>
            </>
          ) : authStatus === "signed-out" ? (
            <>
              <ButtonLink href="/join" onClick={() => setOpen(false)} className="w-full">Join Apollo</ButtonLink>
              <ButtonLink href="/signin" onClick={() => setOpen(false)} variant="secondary" className="w-full">Sign In</ButtonLink>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
