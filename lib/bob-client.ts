import type { GitHubRepoContext } from "./github";

export type BobWorkflow = "repo" | "domino" | "diet" | "translator" | "savior";

export type BobResult = {
  provider: "ibm-bob" | "local-fallback";
  status: "connected" | "fallback";
  summary: string;
  bullets: string[];
  raw?: unknown;
};

type BobRequest = {
  workflow: BobWorkflow;
  repo: GitHubRepoContext;
  extra?: string;
};

function buildPrompt({ workflow, repo, extra }: BobRequest) {
  return [
    "You are IBM Bob analyzing a GitHub repository for the Bob 360 hackathon dashboard.",
    `Workflow: ${workflow}`,
    `Repository: ${repo.fullName}`,
    `Description: ${repo.description}`,
    `Primary language: ${repo.language}`,
    `Files sampled: ${repo.files.slice(0, 80).join(", ")}`,
    `Package manifests: ${repo.packageFiles.join(", ") || "none detected"}`,
    extra ? `Extra input: ${extra}` : "",
    "Return concise JSON with summary and 3 short bullets.",
  ].filter(Boolean).join("\n");
}

function fallbackAnalysis({ workflow, repo }: BobRequest): BobResult {
  const fileCount = repo.files.length;
  const sourceCount = repo.sourceFiles.length;
  const packageCount = repo.packageFiles.length;
  const languageList = Object.keys(repo.languages).slice(0, 4);

  const workflowSummary: Record<BobWorkflow, string> = {
    repo: `${repo.fullName} loaded with ${fileCount} files, ${sourceCount} source files, and ${packageCount} package manifests.`,
    domino: `${repo.fullName} has ${sourceCount} source files to trace for rename and cascade-impact risks.`,
    diet: `${repo.fullName} has ${fileCount} tracked files; Bob 360 found cleanup candidates by scanning manifests and source layout.`,
    translator: `${repo.fullName} context is ready for PR-to-executive translation with ${repo.language} as the main stack.`,
    savior: `${repo.fullName} context is ready for crash-log triage across ${sourceCount} source files.`,
  };

  return {
    provider: "local-fallback",
    status: "fallback",
    summary: workflowSummary[workflow],
    bullets: [
      `Default branch: ${repo.defaultBranch}`,
      `Languages: ${languageList.length ? languageList.join(", ") : repo.language}`,
      `Repo signal: ${repo.openIssues} open issues, ${Math.max(1, Math.round(repo.sizeKb / 1024))} MB indexed`,
    ],
  };
}

function extractBobText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const data = payload as Record<string, unknown>;
  const candidates = [
    data.output,
    data.response,
    data.text,
    data.content,
    data.message,
    Array.isArray(data.choices)
      ? (data.choices[0] as { message?: { content?: string }; text?: string } | undefined)?.message?.content ??
        (data.choices[0] as { text?: string } | undefined)?.text
      : undefined,
  ];

  return candidates.find((candidate): candidate is string => typeof candidate === "string") ?? "";
}

export async function runBobWorkflow(request: BobRequest): Promise<BobResult> {
  const apiKey = process.env.IBM_BOB_API_KEY ?? process.env.BOBSHELL_API_KEY;
  const apiUrl = process.env.IBM_BOB_API_URL;

  if (!apiKey || !apiUrl) {
    return fallbackAnalysis(request);
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        prompt: buildPrompt(request),
        workflow: request.workflow,
        repository: request.repo,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return fallbackAnalysis(request);
    }

    const payload = (await res.json()) as unknown;
    const text = extractBobText(payload);
    if (!text) {
      return fallbackAnalysis(request);
    }

    return {
      provider: "ibm-bob",
      status: "connected",
      summary: text.slice(0, 260),
      bullets: text.split(/\n+/).filter(Boolean).slice(0, 3),
      raw: payload,
    };
  } catch {
    return fallbackAnalysis(request);
  }
}

