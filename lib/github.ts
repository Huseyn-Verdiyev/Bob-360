export type GitHubRepoContext = {
  url: string;
  fullName: string;
  name: string;
  description: string;
  defaultBranch: string;
  stars: number;
  openIssues: number;
  sizeKb: number;
  language: string;
  languages: Record<string, number>;
  files: string[];
  packageFiles: string[];
  sourceFiles: string[];
  fetchedAt: string;
};

type GitHubRepoApi = {
  name: string;
  full_name: string;
  description: string | null;
  default_branch: string;
  stargazers_count: number;
  open_issues_count: number;
  size: number;
  language: string | null;
};

type GitTreeItem = {
  path?: string;
  type?: "blob" | "tree" | string;
};

export function parseGitHubRepoUrl(input: string) {
  const trimmed = input.trim();
  const match = trimmed.match(/^https?:\/\/github\.com\/([^/\s]+)\/([^/\s#?]+)(?:[/?#].*)?$/i);

  if (!match) {
    throw new Error("Paste a valid GitHub repo link, for example https://github.com/owner/repo");
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, ""),
    url: `https://github.com/${match[1]}/${match[2].replace(/\.git$/i, "")}`,
  };
}

export async function fetchGitHubRepoContext(repoUrl: string): Promise<GitHubRepoContext> {
  const { owner, repo, url } = parseGitHubRepoUrl(repoUrl);
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "bob-360-hackathon",
  };

  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    cache: "no-store",
  });

  if (!repoRes.ok) {
    throw new Error(repoRes.status === 404 ? "GitHub repo was not found or is private." : "GitHub repo could not be loaded.");
  }

  const repoData = (await repoRes.json()) as GitHubRepoApi;

  const [languagesRes, treeRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers, cache: "no-store" }),
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${repoData.default_branch}?recursive=1`,
      { headers, cache: "no-store" },
    ),
  ]);

  const languages = languagesRes.ok ? ((await languagesRes.json()) as Record<string, number>) : {};
  const treeJson = treeRes.ok ? ((await treeRes.json()) as { tree?: GitTreeItem[] }) : { tree: [] };
  const files = (treeJson.tree ?? [])
    .filter((item) => item.type === "blob" && item.path)
    .map((item) => item.path as string)
    .slice(0, 500);

  const sourceFiles = files.filter((path) =>
    /\.(ts|tsx|js|jsx|py|java|go|rs|php|rb|cs|cpp|c|swift|kt)$/i.test(path),
  );
  const packageFiles = files.filter((path) =>
    /(^|\/)(package\.json|requirements\.txt|pyproject\.toml|pom\.xml|go\.mod|Cargo\.toml|composer\.json)$/i.test(path),
  );

  return {
    url,
    fullName: repoData.full_name,
    name: repoData.name,
    description: repoData.description ?? "No description provided.",
    defaultBranch: repoData.default_branch,
    stars: repoData.stargazers_count,
    openIssues: repoData.open_issues_count,
    sizeKb: repoData.size,
    language: repoData.language ?? Object.keys(languages)[0] ?? "Mixed",
    languages,
    files,
    packageFiles,
    sourceFiles,
    fetchedAt: new Date().toISOString(),
  };
}

