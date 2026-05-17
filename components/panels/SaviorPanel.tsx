"use client";
import { useState } from "react";
import { MOCK_ERROR_LOG, MOCK_ROOT_CAUSE } from "@/lib/mock-repo";
import type { BobResult } from "@/lib/bob-client";
import type { GitHubRepoContext } from "@/lib/github";
import styles from "./panels.module.css";

export default function SaviorPanel({ repo }: { repo: GitHubRepoContext | null }) {
  const [log, setLog] = useState("");
  const [step, setStep] = useState<"idle" | "analyzing" | "result" | "fixed">("idle");
  const [progress, setProgress] = useState(0);
  const [bobResult, setBobResult] = useState<BobResult | null>(null);
  const [alarmActive, setAlarmActive] = useState(false);
  const [timeStr] = useState("03:17");
  const [amPm] = useState("AM");


  const handleLoadDemo = () => {
    setLog(MOCK_ERROR_LOG);
    setAlarmActive(true);
  };

  const handleAnalyze = () => {
    if (!log.trim()) return;
    setStep("analyzing");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        if (repo) {
          fetch("/api/bob", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workflow: "savior", repo, extra: log }),
          })
            .then((res) => res.json())
            .then((data: { bob?: BobResult }) => setBobResult(data.bob ?? null))
            .finally(() => setTimeout(() => setStep("result"), 300));
        } else {
          setTimeout(() => setStep("result"), 500);
        }
      }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  const handleFix = () => setStep("fixed");

  return (
    <div className={styles.panelGrid2}>
      {/* ── LEFT: Alarm + Log Input ─────────────────────────── */}
      <div>
        {/* Night clock */}
        <div className={`${styles.alarmHeader} glass-card ${alarmActive ? "animate-alarm" : ""}`}>
          <div className={styles.clockSection}>
            <div className={styles.clockIcon}>🌙</div>
            <div className={styles.clockTime}>{timeStr} <span style={{fontSize:16, fontWeight:400, color:"var(--text-muted)"}}>{amPm}</span></div>
            <div className={styles.clockLabel}>Production Server Time</div>
          </div>
          <div className={styles.alarmSection}>
            {alarmActive ? (
              <>
                <div className={styles.alarmDot} />
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent-red)" }}>🚨 PRODUCTION DOWN</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>PagerDuty alert received</div>
                </div>
              </>
            ) : (
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
                No active alerts. System nominal.
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            id="btn-load-crash-log"
            className="btn btn-danger btn-sm"
            onClick={handleLoadDemo}
            style={{ flex: 1 }}
          >
            🚨 Load Crash Log
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setLog(""); setAlarmActive(false); setStep("idle"); }}
          >
            Clear
          </button>
        </div>

        <div className={styles.sectionLabel} style={{ marginTop: 16 }}>Error Log (paste here)</div>
        <textarea
          id="input-crash-log"
          className={styles.logInput}
          value={log}
          onChange={(e) => setLog(e.target.value)}
          placeholder="Paste your error log here...&#10;&#10;[ERROR] 2026-05-14 03:17:42 UTC&#10;TypeError: Cannot read properties of undefined..."
          rows={10}
        />

        {step === "idle" && log.trim() && (
          <button
            id="btn-savior-analyze"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 12 }}
            onClick={handleAnalyze}
          >
            🔍 Analyze with Bob 360
          </button>
        )}

        {step === "analyzing" && (
          <div style={{ marginTop: 12 }}>
            <div className={styles.analyzingLabel}>Bob 360 tracing the crash through your codebase...</div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill red" style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.analyzingHint} style={{ marginTop: 6, color: "var(--accent-red)" }}>
              Cross-referencing with git history and PR log...
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Root Cause Analysis ─────────────────────── */}
      <div>
        <div className={styles.sectionLabel}>🤖 Bob 360 — Root Cause Analysis</div>

        {(step === "idle" || step === "analyzing") && (
          <div className={`${styles.emptyState} glass-card`}>
            <div className={styles.emptyStateIcon}>🚨</div>
            <div className={styles.emptyStateText}>
              {step === "idle"
                ? "Paste a crash log and Bob 360 will trace it to the exact commit, PR, and developer — in seconds."
                : "Scanning git history, cross-referencing file changes, checking all recent PRs..."}
            </div>
          </div>
        )}

        {(step === "result" || step === "fixed") && (
          <div className={styles.resultContainer}>
            {/* Root cause card */}
            <div className={`${styles.rootCauseCard} glass-card`} style={{ borderColor: "rgba(239,68,68,0.3)" }}>
              <div style={{ fontWeight: 700, color: "var(--accent-red)", marginBottom: 12 }}>
                🎯 Root Cause Identified
              </div>
              <div className={styles.causeRow}>
                <span className={styles.causeLabel}>Crash file</span>
                <code className={styles.codeInline}>{MOCK_ROOT_CAUSE.crashFile}:{MOCK_ROOT_CAUSE.crashLine}</code>
              </div>
              <div className={styles.causeRow}>
                <span className={styles.causeLabel}>Root in</span>
                <code className={styles.codeInline}>{MOCK_ROOT_CAUSE.rootCause}:{MOCK_ROOT_CAUSE.rootCauseLine}</code>
              </div>
            </div>

            {/* Triggering PR */}
            <div className={`${styles.prTriggerCard} glass-card`} style={{ borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.04)" }}>
              <div style={{ fontWeight: 700, color: "var(--accent-amber)", marginBottom: 12 }}>
                ⚡ Triggering Change
              </div>
              <div className={styles.causeRow}>
                <span className={styles.causeLabel}>PR</span>
                <span className="badge badge-amber">{MOCK_ROOT_CAUSE.triggeringPR.number}</span>
              </div>
              <div className={styles.causeRow}>
                <span className={styles.causeLabel}>Author</span>
                <strong>{MOCK_ROOT_CAUSE.triggeringPR.author}</strong>
              </div>
              <div className={styles.causeRow}>
                <span className={styles.causeLabel}>When</span>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{MOCK_ROOT_CAUSE.triggeringPR.date}</span>
              </div>
              <div className={styles.causeRow}>
                <span className={styles.causeLabel}>Message</span>
                <em style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  &quot;{MOCK_ROOT_CAUSE.triggeringPR.message}&quot;
                </em>
              </div>
            </div>

            {/* Explanation */}
            <div className={`${styles.explanationCard} glass-card`}>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {bobResult?.summary ?? MOCK_ROOT_CAUSE.explanation}
              </div>
            </div>

            {/* 1-Click Fix */}
            {step === "result" && (
              <>
                <div className={styles.sectionLabel} style={{ marginTop: 16 }}>Suggested Fix</div>
                <div className="code-editor">
                  <div className="code-editor-header">
                    <span className="terminal-dot red" /><span className="terminal-dot yellow" /><span className="terminal-dot green" />
                    <span className="code-editor-filename">{MOCK_ROOT_CAUSE.fix.file}:{MOCK_ROOT_CAUSE.fix.line}</span>
                  </div>
                  <div className="code-editor-body">
                    <div className="code-line highlight">
                      <span className="code-line-num">-</span>
                      <span className="code-line-content" style={{ color: "var(--accent-red)", fontSize: 12 }}>{MOCK_ROOT_CAUSE.fix.before}</span>
                    </div>
                    <div className="code-line safe">
                      <span className="code-line-num">+</span>
                      <span className="code-line-content" style={{ color: "var(--accent-green)", fontSize: 12 }}>{MOCK_ROOT_CAUSE.fix.after}</span>
                    </div>
                  </div>
                </div>
                <button id="btn-apply-fix" className="btn btn-success" style={{ width: "100%", marginTop: 12 }} onClick={handleFix}>
                  ⚡ Apply 1-Click Fix & Restart Server
                </button>
              </>
            )}

            {step === "fixed" && (
              <div className={`${styles.successBanner} glass-card`}>
                <span style={{ fontSize: 24 }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent-green)" }}>
                    Server restored. Downtime: 43 seconds.
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                    Fix applied to 1 file. PR #252 auto-created for review. Farid Hashimli notified.
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
