import { fetchGitHubRepoContext } from "@/lib/github";
import { runBobWorkflow } from "@/lib/bob-client";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { repoUrl?: string };
    if (!body.repoUrl) {
      return Response.json({ error: "GitHub repo link is required." }, { status: 400 });
    }

    const repo = await fetchGitHubRepoContext(body.repoUrl);
    const bob = await runBobWorkflow({ workflow: "repo", repo });

    return Response.json({ repo, bob });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Repo preview could not be loaded.";
    return Response.json({ error: message }, { status: 400 });
  }
}
