"use client";

import { useEffect, useState } from "react";

export function TableOfContents({
  items,
}: {
  items: { id: string; heading: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="mono-label text-faint">Contents</p>
      <ol className="mt-5 flex flex-col gap-3.5">
        {items.map((item, i) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`group flex gap-3 text-[0.875rem] leading-snug transition-colors duration-200 ${
                  current ? "text-paper" : "text-faint hover:text-paper-dim"
                }`}
              >
                <span
                  className={`mono-label pt-0.5 transition-colors duration-200 ${
                    current ? "text-signal-text" : "text-faint"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.heading}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
