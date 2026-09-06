import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { IntroGate, IntroSequence } from "@/components/brand/IntroSequence";
import { PointerGlow } from "@/components/ui/PointerGlow";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apollo Labs — Student-Led Research & Projects",
    template: "%s — Apollo Labs",
  },
  description:
    "Apollo Labs is a student-led research community where students build, refine, and publish serious research papers, engineering projects, and software.",
};

export const viewport: Viewport = {
  themeColor: "#f6f4f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // IntroGate stamps data-apollo-intro on <html> before hydration.
    // Font variables live on <html>: Tailwind's @theme resolves --font-sans /
    // --font-serif / --font-mono at :root, and a custom property referencing a
    // variable defined further down the tree resolves to invalid there.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <IntroGate />
        <IntroSequence />
        <PointerGlow />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <div className="relative z-10">
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
