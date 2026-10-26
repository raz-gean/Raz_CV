import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { FiAward, FiBriefcase, FiMail, FiMapPin, FiPhone, FiStar } from "react-icons/fi";
import {
  achievements,
  basicInfo,
  certifications,
  education,
  experience,
  githubUser,
  links,
  profile,
  skillGroups,
  softSkills,
} from "@/data/cv";
import { getGithub } from "@/lib/github";
import { CopyEmail, PrintButton, ThemeToggle } from "./client";
import { skillIcons, socialIcons } from "./icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const hlDelay = (ms: number) => ({ "--hl-delay": `${ms}ms` }) as CSSProperties;

export function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      data-hl-root
      className="scroll-mt-16 border-t border-rule py-16 first:border-t-0 sm:py-20 lg:scroll-mt-4"
    >
      <h2 id={`${id}-heading`} className="type-wide text-[clamp(1.9rem,4vw,2.6rem)] leading-tight font-extrabold">
        <span className="stroke">{title}</span>
      </h2>
      {lede && <p className="mt-3 max-w-[62ch] text-ink-2">{lede}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- Cover */

export function Cover() {
  return (
    <header id="profile" data-hl-root className="mx-auto max-w-[1200px] px-4 sm:px-8">
      <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
        <p className="text-sm">
          <span className="font-semibold">{profile.name}</span>
          <span className="hidden text-ink-2 sm:inline"> / Curriculum vitae</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="no-print hidden sm:block">
            <PrintButton />
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="grid items-end gap-10 pt-10 pb-14 lg:grid-cols-[1fr_auto] lg:gap-12 lg:pt-20 lg:pb-20">
        <div>
          <p className="fade-in inline-flex items-center gap-2 text-sm font-medium text-ink-2" style={delay(50)}>
            <span aria-hidden className="size-2 rounded-full bg-cobalt" />
            {profile.status}
          </p>
          <h1 className="type-wide mt-6 text-[clamp(3.25rem,10.5vw,9.5rem)] leading-[0.92] font-extrabold">
            <span className="rise">
              <span style={delay(120)}>{profile.firstLine}</span>
            </span>
            <span className="rise">
              <span style={delay(240)}>{profile.secondLine}</span>
            </span>
          </h1>
          <p className="mt-7 text-xl leading-snug font-semibold sm:text-2xl">
            <span className="mark" style={hlDelay(900)}>
              {profile.title}
            </span>
          </p>
          <p className="fade-in mt-6 max-w-[60ch] text-lg text-ink-2" style={delay(650)}>
            {profile.intro}
          </p>
          <div className="fade-in no-print mt-8 flex flex-wrap gap-3" style={delay(800)}>
            <a
              href={`mailto:${basicInfo.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-opacity hover:opacity-85"
            >
              <FiMail aria-hidden />
              Email me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center rounded-full border border-ink/30 px-5 py-2.5 font-medium transition-colors hover:bg-ink/5"
            >
              See my projects
            </a>
          </div>
        </div>

        <figure className="photo-drop relative order-first w-[min(52vw,220px)] sm:w-[260px] lg:order-none lg:mb-4 lg:w-[340px]">
          <span
            aria-hidden
            className="tape absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-6 rounded-[2px]"
          />
          <div className="overflow-hidden rounded-[3px] border-[7px] border-sheet bg-sheet shadow-[0_22px_45px_-22px_rgb(22_32_58/0.55)]">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={600}
              height={600}
              preload
              sizes="(min-width: 1024px) 340px, 260px"
              className="aspect-square w-full object-cover"
            />
          </div>
        </figure>
      </div>

      <div className="grid gap-3 border-t border-rule py-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <h2 className="type-semi text-lg font-bold">Career objective</h2>
        <p className="max-w-[62ch] text-xl leading-relaxed">{profile.objective}</p>
      </div>
    </header>
  );
}

/* ------------------------------------------------------- Basic information */

export function About() {
  return (
    <Section id="about" title="Basic information">
      <div className="grid gap-12 xl:grid-cols-[1fr_18rem]">
        <div>
          <p className="max-w-[62ch] text-lg">{basicInfo.description}</p>
          <h3 className="mt-10 font-bold">Career interests</h3>
          <dl className="mt-4 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {basicInfo.interests.map((i) => (
              <div key={i.title} className="border-l-2 border-cobalt pl-4">
                <dt className="font-semibold">{i.title}</dt>
                <dd className="mt-0.5 text-[0.95rem] text-ink-2">{i.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <dl className="print-avoid h-fit divide-y divide-rule rounded-lg border border-rule bg-sheet px-5">
          <InfoRow icon={<FiMapPin />} label="Location">
            {basicInfo.location}
          </InfoRow>
          <InfoRow icon={<FiMail />} label="Email">
            <a href={`mailto:${basicInfo.email}`} className="break-all underline decoration-rule underline-offset-4 hover:decoration-cobalt">
              {basicInfo.email}
            </a>
            <div className="mt-2">
              <CopyEmail email={basicInfo.email} />
            </div>
          </InfoRow>
          {basicInfo.phone && (
            <InfoRow icon={<FiPhone />} label="Phone">
              <a href={`tel:${basicInfo.phone.replace(/\s/g, "")}`}>{basicInfo.phone}</a>
            </InfoRow>
          )}
          <InfoRow icon={<FiBriefcase />} label="Availability">
            {basicInfo.availability}
          </InfoRow>
        </dl>
      </div>
    </Section>
  );
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 py-4">
      <span aria-hidden className="mt-1 text-cobalt">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-sm text-ink-2">{label}</dt>
        <dd className="font-medium">{children}</dd>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Education */

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-12">
        {education.map((e) => (
          <article key={e.school} className="print-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="type-semi text-2xl font-bold">{e.school}</h3>
              <p className="text-sm text-ink-2">
                {e.current && (
                  <span className="mark mr-2 font-semibold" style={hlDelay(500)}>
                    Currently enrolled
                  </span>
                )}
                {e.period}
              </p>
            </div>
            <p className="mt-1 text-lg">{e.program}</p>
            {e.highlights.length > 0 && (
              <>
                <h4 className="mt-6 text-sm font-semibold text-ink-2">Academic highlights</h4>
                <ul className="mt-3 space-y-2.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-cobalt" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ Skills */

export function Skills() {
  let n = 0;
  return (
    <Section
      id="skills"
      title="Skills"
      lede={
        <>
          <span className="mark" style={hlDelay(150)}>
            Highlighted
          </span>{" "}
          skills are the ones I&apos;ve used in shipped projects. The rest I&apos;ve used in coursework or practice.
        </>
      }
    >
      <div className="space-y-8">
        {skillGroups.map((g) => (
          <div key={g.group} className="print-avoid grid gap-3 sm:grid-cols-[12rem_1fr]">
            <h3 className="pt-1.5 text-sm font-semibold text-ink-2">{g.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s) => {
                const Icon = s.icon ? skillIcons[s.icon] : null;
                const style = s.core ? hlDelay(300 + n++ * 45) : undefined;
                return (
                  <li key={s.name}>
                    <span
                      style={style}
                      className={`${s.core ? "mark" : ""} m-0 inline-flex items-center gap-2 rounded-md border border-rule px-3 py-1.5 text-sm font-medium`}
                    >
                      {Icon && <Icon aria-hidden className="shrink-0" />}
                      {s.name}
                      {s.core && <span className="sr-only">(used in shipped projects)</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-16 font-bold">Professional skills</h3>
      <dl className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {softSkills.map((s) => (
          <div key={s.name} className="print-avoid border-l-2 border-cobalt pl-4">
            <dt className="font-semibold">{s.name}</dt>
            <dd className="mt-0.5 text-[0.95rem] text-ink-2">{s.proof}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ------------------------------------------------------------------ GitHub */

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e3c800",
  Python: "#3572a5",
  Dart: "#00b4ab",
  CSS: "#663399",
  HTML: "#e34c26",
  Lua: "#000080",
};

const fallbackRepos = [
  { name: "Smartalyze-Web", description: "Smart data analysis and preprocessing tool", language: "JavaScript" },
  { name: "KioskiSystem_IT415", description: "SizzleBites POS kiosk for the IT415 practical exam", language: "JavaScript" },
  { name: "Showspree", description: "Movie site with TMDB API integration", language: "TypeScript" },
  { name: "Flutter_FindMed", description: "Flutter app for finding and tracking medicine", language: "Dart" },
  { name: "Sales-Data-Analyzer", description: "Python script for cleaning and analyzing small sales datasets", language: "Python" },
  { name: "Flutter_MakeIt", description: "Simple recipe app", language: "Dart" },
];

const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export async function GitHub() {
  const data = await getGithub(githubUser);
  const repos =
    data?.repos.map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      href: r.html_url,
      updated: monthYear(r.pushed_at),
    })) ??
    fallbackRepos.map((r) => ({ ...r, href: `${links.github.href}/${r.name}`, updated: null as string | null }));

  return (
    <Section
      id="github"
      title="GitHub"
      lede={
        data
          ? "My most recently updated public repositories, pulled live from GitHub."
          : "A selection of my public repositories."
      }
    >
      <div className="print-avoid flex flex-col gap-6 rounded-lg border border-rule bg-sheet p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-4">
          <Image
            src={data?.profile.avatar_url ?? profile.photo}
            alt=""
            width={64}
            height={64}
            className="size-16 rounded-full border border-rule object-cover"
          />
          <div>
            <p className="font-bold">{data?.profile.name ?? profile.name}</p>
            <p className="text-ink-2">@{githubUser}</p>
          </div>
        </div>
        {data && (
          <dl className="flex gap-8 sm:ml-auto">
            <div>
              <dt className="text-sm text-ink-2">Public repos</dt>
              <dd className="type-semi text-2xl font-bold">{data.profile.public_repos}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-2">On GitHub since</dt>
              <dd className="type-semi text-2xl font-bold">{new Date(data.profile.created_at).getUTCFullYear()}</dd>
            </div>
          </dl>
        )}
        <a
          href={links.github.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-opacity hover:opacity-85 ${data ? "" : "sm:ml-auto"}`}
        >
          <SocialIcon name="github" />
          Visit my GitHub
        </a>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {repos.map((r) => (
          <li key={r.name} className="print-avoid">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-rule p-5 transition-colors hover:border-ink/40 hover:bg-sheet"
            >
              <span className="font-semibold break-all text-cobalt group-hover:underline">{r.name}</span>
              <span className="mt-1.5 line-clamp-2 text-sm text-ink-2">{r.description ?? "No description yet."}</span>
              <span className="mt-auto flex items-center gap-4 pt-4 text-xs text-ink-2">
                {r.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full"
                      style={{ background: languageColors[r.language] ?? "var(--ink-2)" }}
                    />
                    {r.language}
                  </span>
                )}
                {r.updated && <span>Updated {r.updated}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* -------------------------------------------------------------- Experience */

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      lede="Freelance work, academic project roles and the things I do outside class."
    >
      <ol className="relative ml-1.5 border-l border-rule">
        {experience.map((x, i) => (
          <li key={x.role} className="print-avoid relative pb-12 pl-8 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-2 -left-[7px] size-3.5 rounded-full border-2 border-paper ${i === 0 ? "bg-hl ring-1 ring-ink/40" : "bg-cobalt"}`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="type-semi text-xl font-bold">{x.role}</h3>
              <p className="text-sm text-ink-2">{x.period}</p>
            </div>
            <p className="mt-0.5 font-medium text-cobalt">{x.org}</p>
            <ul className="mt-3 space-y-2 text-ink-2">
              {x.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-2" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------ Achievements */

export function Achievements() {
  return (
    <Section id="achievements" title={certifications.length > 0 ? "Achievements & certifications" : "Achievements"}>
      <ul className="grid gap-x-10 sm:grid-cols-2">
        {achievements.map((a) => (
          <li key={a.title} className="print-avoid flex gap-4 border-t border-rule py-5">
            <FiAward aria-hidden className="mt-1 shrink-0 text-xl text-cobalt" />
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="mt-0.5 text-[0.95rem] text-ink-2">{a.detail}</p>
              <p className="mt-1 text-sm text-ink-2">{a.year}</p>
            </div>
          </li>
        ))}
      </ul>

      {certifications.length > 0 && (
        <>
          <h3 className="mt-12 font-bold">Certifications</h3>
          <ul className="mt-2 grid gap-x-10 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.title} className="print-avoid flex gap-4 border-t border-rule py-5">
                <FiStar aria-hidden className="mt-1 shrink-0 text-xl text-cobalt" />
                <div>
                  <p className="font-semibold">
                    {c.link ? (
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {c.title}
                      </a>
                    ) : (
                      c.title
                    )}
                  </p>
                  <p className="mt-0.5 text-[0.95rem] text-ink-2">
                    {c.issuer}, {c.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}

/* ----------------------------------------------------------------- Contact */

function SocialIcon({ name }: { name: string }) {
  const Icon = socialIcons[name];
  return Icon ? <Icon aria-hidden /> : null;
}

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact & social"
      lede="I'm open to internships, OJT, freelance projects and good conversations. Email is the fastest way to reach me."
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={`mailto:${basicInfo.email}`}
          className="type-wide text-[clamp(1.25rem,4.2vw,2.6rem)] font-extrabold break-all underline decoration-hl decoration-[0.18em] underline-offset-[0.2em] transition-colors hover:text-cobalt"
        >
          {basicInfo.email}
        </a>
        <CopyEmail email={basicInfo.email} />
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2">
        {Object.entries(links).map(([key, l]) => (
          <li key={key}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg border border-rule bg-sheet p-4 transition-colors hover:border-ink/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-lg text-paper transition-colors group-hover:bg-cobalt">
                <SocialIcon name={key} />
              </span>
              <span>
                <span className="block font-semibold">{l.label}</span>
                <span className="block text-sm text-ink-2">{l.href.replace("https://", "")}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* --------------------------------------------------------------- Side rail */

export function RailDetails() {
  return (
    <div className="mt-10 hidden space-y-5 border-t border-rule pt-6 text-sm lg:block">
      <p className="flex items-start gap-2 text-ink-2">
        <FiMapPin aria-hidden className="mt-1 shrink-0" />
        {basicInfo.location}
      </p>
      <ul className="flex gap-2" aria-label="Social profiles">
        {Object.entries(links).map(([key, l]) => (
          <li key={key}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="grid size-9 place-items-center rounded-full border border-rule transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <SocialIcon name={key} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-ink-2 sm:px-8">
        <p>&copy; 2026 {profile.name}. Built with Next.js and deployed on Vercel.</p>
        <a href="#profile" className="no-print font-medium text-ink hover:underline">
          Back to top
        </a>
      </div>
    </footer>
  );
}
