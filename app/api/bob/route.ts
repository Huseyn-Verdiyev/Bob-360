import { runBobWorkflow, type BobWorkflow } from "@/lib/bob-client";
import type { GitHubRepoContext } from "@/lib/github";

const WORKFLOWS = new Set<BobWorkflow>(["repo", "domino", "diet", "translator", "savior"]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      workflow?: BobWorkflow;
      repo?: GitHubRepoContext;
      extra?: string;
    };

    if (!body.workflow || !WORKFLOWS.has(body.workflow)) {
      return Response.json({ error: "Valid workflow is required." }, { status: 400 });
    }

    if (!body.repo) {
      return Response.json({ error: "Repository context is required." }, { status: 400 });
    }

    const bob = await runBobWorkflow({
      workflow: body.workflow,
      repo: body.repo,
      extra: body.extra,
    });

    return Response.json({ bob });
  } catch {
    return Response.json({ error: "Bob analysis failed." }, { status: 500 });
  }
}
