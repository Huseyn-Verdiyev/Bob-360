"use client";
import { useState } from "react";
import { MOCK_CHANGE } from "@/lib/mock-repo";
import type { BobResult } from "@/lib/bob-client";
import type { GitHubRepoContext } from "@/lib/github";
import styles from "./panels.module.css";

const SEVERITY_COLOR: Record<string, string> = {
  critical: "red",
  warning:  "amber",
};

export default function DominoPanel({ repo }: { repo: GitHubRepoContext | null }) {
  const [step, setStep] = useState<"idle" | "analyzing" | "result" | "fixed">("idle");
  const [progress, setProgress] = useState(0);
  const [bobResult, setBobResult] = useState<BobResult | null>(null);

  const handleAnalyze = () => {
    setStep("analyzing");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        if (repo) {
          fetch("/api/bob", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workflow: "domino", repo }),
          })
            .then((res) => res.json())
            .then((data: { bob?: BobResult }) => setBobResult(data.bob ?? null))
            .finally(() => setTimeout(() => setStep("result"), 300));
        } else {
          setTimeout(() => setStep("result"), 400);
        }
      }
      setProgress(Math.min(p, 100));
    }, 180);
  };

  const handleFix = () => setStep("fixed");

  return (
    <div className={styles.panelGrid2}>
      {/* ── LEFT: Code Editor ──────────────────────────────── */}
      <div>
        <div className={styles.sectionLabel}>📄 {repo?.fullName ?? "user_model.js"} — Editing</div>
        <div className="code-editor">
          <div className="code-editor-header">
            <span className="terminal-dot yellow" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="code-editor-filename">src/models/User.js</span>
          </div>
          <div className="code-editor-body">
            {[
              { n:1,  content: <><span className="kw">const</span> mongoose = <span className="fn">require</span>(<span className="str">&apos;mongoose&apos;</span>)</> },
              { n:2,  content: <></> },
              { n:3,  content: <><span className="kw">const</span> userSchema = <span className="kw">new</span> mongoose.<span className="fn">Schema</span>({'{'}</> },
              { n:4,  content: <>{"  "}<span className="prop">email</span>:    {'{'} type: String, required: <span className="kw">true</span> {'}'}</>, },
              { n:5,  content: <>{"  "}<span className="prop">password</span>: {'{'} type: String, required: <span className="kw">true</span> {'}'}</>, },
              {
                n: 6,
                content: (
                  <>
                    {"  "}
                    <span className={step === "result" || step === "fixed" ? "prop" : "prop"} style={{ textDecoration: step !== "idle" && step !== "analyzing" ? "line-through" : "none", color: step !== "idle" && step !== "analyzing" ? "var(--accent-red)" : undefined }}>
                      user_id
                    </span>
                    {(step === "result" || step === "fixed") && <span className="prop" style={{ color: "var(--accent-amber)", marginLeft: 4 }}>→ userId</span>}
                    {": "} {'{'} type: String, default: uuid {'}'}<span className="prop">,</span>
                  </>
                ),
                highlight: step === "result" || step === "fixed",
              },
              { n:7,  content: <>{"  "}<span className="prop">stripeId</span>: {'{'} type: String {'}'}</> },
              { n:8,  content: <>{"  "}<span className="prop">createdAt</span>: {'{'} type: Date, default: Date.now {'}'}</> },
              { n:9,  content: <>{'})'}</> },
            ].map((line) => (
              <div
                key={line.n}
                className={`code-line${line.highlight ? " highlight" : ""}`}
              >
                <span className="code-line-num">{line.n}</span>
                <span className="code-line-content">{line.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Change description */}
        <div className={`${styles.changeBox} glass-card`} style={{ marginTop: 16 }}>
          <div className={styles.changeBoxTitle}>Proposed Change</div>
          <div className={styles.changeBoxBody}>
            Rename field{" "}
            <code className={styles.codeInline} style={{ color: "var(--accent-red)" }}>user_id</code>
            {" → "}
            <code className={styles.codeInline} style={{ color: "var(--accent-green)" }}>userId</code>
            {" "}
            in <code className={styles.codeInline}>src/models/User.js</code> for camelCase consistency.
          </div>
        </div>

        {step === "idle" && (
          <button id="btn-domino-analyze" className="btn btn-primary" style={{ marginTop: 16, width: "100%" }} onClick={handleAnalyze}>
            🔍 Analyze Impact with Bob 360
          </button>
        )}

        {step === "analyzing" && (
          <div style={{ marginTop: 16 }}>
            <div className={styles.analyzingLabel}>Bob 360 scanning repository...</div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill blue" style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.analyzingHint} style={{ marginTop: 8 }}>
              Tracing references across {Math.round(progress * Math.max(12, repo?.sourceFiles.length ?? 247) / 100)} / {repo?.sourceFiles.length ?? 247} files...
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Bob's Analysis ──────────────────────────── */}
      <div>
        <div className={styles.sectionLabel}>🤖 Bob 360 — Impact Analysis</div>

        {(step === "idle" || step === "analyzing") && (
          <div className={`${styles.emptyState} glass-card`}>
            <div className={styles.emptyStateIcon}>🧩</div>
            <div className={styles.emptyStateText}>
              {step === "idle"
                ? "Click 'Analyze Impact' to let Bob 360 scan your entire repository for cascade risks."
                : "Bob is scanning every file, import, and reference..."}
            </div>
          </div>
        )}

        {(step === "result" || step === "fixed") && (
          <div className={styles.resultContainer}>
            {/* Alert Banner */}
            <div className={`${styles.alertBanner} glass-card`} style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)" }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 700, color: "var(--accent-red)", marginBottom: 4 }}>
                  Cascade Risk Detected — {MOCK_CHANGE.affectedFiles.length} files will break
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {bobResult?.summary ?? "Bob 360 traced all references to user_id across the full repository."}
                </div>
              </div>
            </div>

            {/* Affected Files */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {MOCK_CHANGE.affectedFiles.map((file) => (
                <div
                  key={file.path}
                  className={`${styles.affectedFile} glass-card`}
                  style={step === "fixed" ? { borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.05)" } : {}}
                >
                  <div className={styles.affectedFileHeader}>
                    <span className={`badge badge-${step === "fixed" ? "green" : SEVERITY_COLOR[file.severity]}`}>
                      {step === "fixed" ? "✓ Fixed" : file.severity}
                    </span>
                    <code className={styles.codeInline}>{file.path}</code>
                    <span className={styles.fileLine}>line {file.line}</span>
                  </div>
                  <div className="terminal" style={{ marginTop: 8 }}>
                    <div className="terminal-body" style={{ padding: "10px 14px", minHeight: "auto" }}>
                      <div className={`terminal-line ${step === "fixed" ? "success" : "error"}`}>
                        {step === "fixed" ? "✓ " : "✗ "}{file.snippet}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {step === "result" && (
              <button
                id="btn-domino-fix"
                className="btn btn-success"
                style={{ width: "100%", marginTop: 16 }}
                onClick={handleFix}
              >
                ⚡ Auto-fix all {MOCK_CHANGE.affectedFiles.length} files with Bob 360
              </button>
            )}

            {step === "fixed" && (
              <div className={`${styles.successBanner} glass-card`}>
                <span style={{ fontSize: 24 }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent-green)" }}>Cascade blocked. All files updated.</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                    Bob 360 automatically updated all 4 files in 0.8 seconds. No manual hunting required.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
