"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy, FiMoon, FiPrinter, FiSun } from "react-icons/fi";

/** Sets data-seen on each [data-hl-root] the first time it scrolls into view. */
export function HighlightObserver() {
  useEffect(() => {
    const roots = document.querySelectorAll<HTMLElement>("[data-hl-root]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-seen", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.05 },
    );
    roots.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // The icon swaps through the `dark:` variant, so no client state is needed.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className="no-print grid size-10 place-items-center rounded-full border border-rule text-ink transition-colors hover:bg-ink/5"
    >
      <FiMoon aria-hidden className="dark:hidden" />
      <FiSun aria-hidden className="hidden dark:block" />
    </button>
  );
}

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm font-medium transition-colors hover:bg-ink/5 ${className}`}
    >
      <FiPrinter aria-hidden />
      Save as PDF
    </button>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="no-print inline-flex items-center gap-1.5 rounded-full border border-rule px-3 py-1 text-sm text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink"
    >
      {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

/** Section index: sticky rail on desktop, horizontal strip on mobile. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="CV sections" className="no-print">
      <ul className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative block rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors lg:rounded-sm lg:py-1 lg:pl-4 ${
                  isActive ? "bg-hl font-semibold text-hl-ink lg:bg-transparent lg:text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-1/2 left-0 hidden h-[70%] w-1.5 -translate-y-1/2 rounded-full bg-hl transition-transform duration-300 lg:block ${
                    isActive ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
