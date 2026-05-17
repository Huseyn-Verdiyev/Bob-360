import { fetchGitHubRepoContext } from "@/lib/github";
import { runBobWorkflow } from "@/lib/bob-client";

const ANALYZE_COOKIE = "bob360_repo_analyzed";

export async function POST(request: Request) {
  try {
    const cookie = request.headers.get("cookie") ?? "";
    if (cookie.includes(`${ANALYZE_COOKIE}=1`)) {
      return Response.json(
        { error: "This browser has already used its one free repository analysis." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { repoUrl?: string };
    if (!body.repoUrl) {
      return Response.json({ error: "GitHub repo link is required." }, { status: 400 });
    }

    const repo = await fetchGitHubRepoContext(body.repoUrl);
    const bob = await runBobWorkflow({ workflow: "repo", repo });

    return Response.json(
      { repo, bob },
      {
        headers: {
          "Set-Cookie": `${ANALYZE_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`,
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Repo could not be analyzed.";
    return Response.json({ error: message }, { status: 400 });
  }
}
