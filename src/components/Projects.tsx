"use client";

import Image from "next/image";
import { useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project, ProjectKind } from "@/data/cv";

const filters: ("All" | ProjectKind)[] = ["All", "Web", "Mobile", "Game"];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          <FiExternalLink aria-hidden />
          Live demo
          <span className="sr-only">of {project.name} (opens in a new tab)</span>
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm font-medium transition-colors hover:bg-ink/5"
        >
          <FiGithub aria-hidden />
          Source code
          <span className="sr-only">of {project.name} (opens in a new tab)</span>
        </a>
      )}
      {!project.live && !project.repo && (
        <p className="text-sm text-ink-2">Repository is private while the game is in development.</p>
      )}
    </div>
  );
}

function Preview({ project, sizes }: { project: Project; sizes: string }) {
  if (!project.image) {
    return (
      <div className="flex aspect-[16/9] items-end overflow-hidden rounded-md bg-ink p-5">
        <span className="type-wide text-4xl font-extrabold text-hl sm:text-5xl">{project.name}</span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-rule bg-sheet">
      <Image
        src={project.image}
        alt={project.imageAlt ?? project.name}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
      {items.map((s) => (
        <li key={s} className="rounded border border-rule px-2 py-0.5 text-xs font-medium text-ink-2">
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shows = (p: Project) => filter === "All" || p.kinds.includes(filter);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const count = projects.filter(shows).length;

  return (
    <div>
      <div className="no-print mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f ? "border-ink bg-ink text-paper" : "border-rule hover:bg-ink/5"
            }`}
          >
            {f === "All" ? "All projects" : f === "Game" ? "Games" : f}
          </button>
        ))}
        <span className="ml-1 text-sm text-ink-2" aria-live="polite">
          {count} shown
        </span>
      </div>

      {featured.map((p) => (
        <article
          key={`${p.name}-${filter}`}
          hidden={!shows(p)}
          className="project-card print-avoid mb-12 grid gap-6 rounded-lg border border-rule bg-sheet p-4 sm:p-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10"
        >
          <Preview project={p} sizes="(min-width: 1024px) 520px, 100vw" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-cobalt">{p.role}</p>
            <h3 className="type-semi mt-1 text-3xl font-extrabold">{p.name}</h3>
            <p className="mt-3 text-ink-2">{p.summary}</p>
            <Stack items={p.stack} />
            <ProjectLinks project={p} />
          </div>
        </article>
      ))}

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {rest.map((p) => (
          <article key={`${p.name}-${filter}`} hidden={!shows(p)} className="project-card print-avoid flex flex-col">
            <Preview project={p} sizes="(min-width: 768px) 420px, 100vw" />
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="type-semi text-xl font-bold">{p.name}</h3>
              {p.status && (
                <span className="rounded-full bg-hl px-2 py-0.5 text-xs font-semibold text-hl-ink">{p.status}</span>
              )}
            </div>
            <p className="mt-2 text-ink-2">{p.summary}</p>
            <Stack items={p.stack} />
            <ProjectLinks project={p} />
          </article>
        ))}
      </div>
    </div>
  );
}
