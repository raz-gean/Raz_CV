import { cacheLife } from "next/cache";

export type GithubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

const headers = { Accept: "application/vnd.github+json", "User-Agent": "gean-cv" };

/** Public profile and most recently pushed repos. Returns null if GitHub is unreachable. */
export async function getGithub(user: string) {
  "use cache";
  cacheLife("hours");

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers }),
      fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=30`, { headers }),
    ]);
    if (!profileRes.ok || !reposRes.ok) return null;

    const profile = (await profileRes.json()) as GithubProfile;
    const repos = ((await reposRes.json()) as GithubRepo[])
      .filter((r) => !r.fork)
      .slice(0, 6);
    return { profile, repos };
  } catch {
    return null;
  }
}
