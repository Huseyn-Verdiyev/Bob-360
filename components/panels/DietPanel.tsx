"use client";
import { useState } from "react";
import { MOCK_REPO } from "@/lib/mock-repo";
import styles from "./panels.module.css";

export default function DietPanel() {
  const [step, setStep] = useState<"idle" | "scanning" | "result" | "cleaned">("idle");
  const [progress, setProgress] = useState(0);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);

  const handleScan = () => {
    setStep("scanning");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => setStep("result"), 400);
      }
      setProgress(Math.min(p, 100));
    }, 150);
  };

  const handleClean = () => {
    const deadPaths = MOCK_REPO.files.filter((f) => f.status === "dead").map((f) => f.path);
    const pkgNames  = MOCK_REPO.packages.dead.map((p) => `pkg:${p.name}`);
    const allDead   = [...deadPaths, ...pkgNames];
    let i = 0;
    const iv = setInterval(() => {
      if (i >= allDead.length) {
        clearInterval(iv);
        setStep("cleaned");
        return;
      }
      setDeletedItems((prev) => [...prev, allDead[i]]);
      i++;
    }, 280);
  };

  const activeFiles = MOCK_REPO.files.filter((f) => f.status === "active");
  const deadFiles   = MOCK_REPO.files.filter((f) => f.status === "dead");

  return (
    <div className={styles.panelGrid2}>
      {/* ── LEFT: File Tree ────────────────────────────────── */}
      <div>
        <div className={styles.sectionLabel}>📁 Repository File Tree</div>
        <div className={`glass-card ${styles.fileTreeCard}`}>
          <div className={styles.fileTreeHeader}>
            <span>📦 ecommerce-platform</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
              {MOCK_REPO.stats.totalFiles} files total
            </span>
          </div>
          <div className="file-tree">
            {/* Active files */}
            {activeFiles.map((file) => (
              <div key={file.path} className={`file-item safe`}>
                <span className="icon">📄</span>
                <span>{file.path}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-muted)" }}>
                  {(file.size / 1024).toFixed(1)}kb
                </span>
              </div>
            ))}
            {/* Dead files */}
            {deadFiles.map((file) => (
              <div
                key={file.path}
                className={`file-item${
                  step === "result" ? " dead" :
                  deletedItems.includes(file.path) ? " dead" :
                  ""
                }`}
                style={deletedItems.includes(file.path) ? { opacity: 0, transition: "opacity 0.4s" } : {}}
              >
                <span className="icon">
                  {step === "result" || deletedItems.includes(file.path) ? "🗑️" : "📄"}
                </span>
                <span>{file.path}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--accent-red)" }}>
                  {(file.size! / 1024).toFixed(1)}kb
                </span>
              </div>
            ))}
          </div>
        </div>

        {step === "idle" && (
          <button id="btn-diet-scan" className="btn btn-primary" style={{ marginTop: 16, width: "100%" }} onClick={handleScan}>
            🔍 Run Code Diet Analysis
          </button>
        )}
        {step === "scanning" && (
          <div style={{ marginTop: 16 }}>
            <div className={styles.analyzingLabel}>Bob 360 scanning for dead code...</div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill blue" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Results ─────────────────────────────────── */}
      <div>
        <div className={styles.sectionLabel}>🤖 Bob 360 — Diet Report</div>

        {(step === "idle" || step === "scanning") && (
          <div className={`${styles.emptyState} glass-card`}>
            <div className={styles.emptyStateIcon}>🗑️</div>
            <div className={styles.emptyStateText}>
              {step === "idle"
                ? "Run analysis to find all dead files, unused imports, and zombie packages."
                : "Checking every import, every require(), every package.json entry..."}
            </div>
          </div>
        )}

        {(step === "result" || step === "cleaned") && (
          <div className={styles.resultContainer}>
            {/* Stats row */}
            <div className={styles.statsRow}>
              <div className={`glass-card ${styles.miniStat}`}>
                <div className="stat-number" style={{ color: "var(--accent-red)", fontSize: 28 }}>
                  {MOCK_REPO.stats.deadFiles}
                </div>
                <div className="stat-label">Dead Files</div>
              </div>
              <div className={`glass-card ${styles.miniStat}`}>
                <div className="stat-number" style={{ color: "var(--accent-amber)", fontSize: 28 }}>
                  {MOCK_REPO.stats.deadPackages}
                </div>
                <div className="stat-label">Zombie Packages</div>
              </div>
              <div className={`glass-card ${styles.miniStat}`}>
                <div className="stat-number" style={{ color: "var(--accent-cyan)", fontSize: 28 }}>
                  {MOCK_REPO.stats.deadFunctions}
                </div>
                <div className="stat-label">Dead Functions</div>
              </div>
            </div>

            {/* Dead packages */}
            <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Zombie Packages (package.json)</div>
            {MOCK_REPO.packages.dead.map((pkg) => (
              <div
                key={pkg.name}
                className={`${styles.packageItem} glass-card`}
                style={
                  deletedItems.includes(`pkg:${pkg.name}`)
                    ? { opacity: 0, maxHeight: 0, overflow: "hidden", padding: 0, margin: 0, transition: "all 0.4s" }
                    : { borderColor: "rgba(239,68,68,0.2)" }
                }
              >
                <div className={styles.packageItemHeader}>
                  <code className={styles.codeInline} style={{ color: "var(--accent-red)" }}>
                    {pkg.name}@{pkg.version}
                  </code>
                  <span className="badge badge-red">Unused</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{pkg.reason}</div>
              </div>
            ))}

            {/* Size savings */}
            <div className={`${styles.savingsCard} glass-card`} style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Current size</span>
                <strong style={{ color: "var(--accent-red)" }}>{MOCK_REPO.stats.totalSize}</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill red" style={{ width: "100%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>After diet</span>
                <strong style={{ color: "var(--accent-green)" }}>{MOCK_REPO.stats.projectedSize}</strong>
              </div>
              <div className="progress-bar" style={{ marginTop: 4 }}>
                <div className="progress-fill green" style={{ width: `${100 - MOCK_REPO.stats.savingsPercent}%` }} />
              </div>
              <div style={{ textAlign: "center", marginTop: 16, fontSize: 24, fontWeight: 900 }} className="gradient-text">
                -{MOCK_REPO.stats.savingsPercent}% Lighter
              </div>
            </div>

            {step === "result" && (
              <button id="btn-diet-clean" className="btn btn-danger" style={{ width: "100%", marginTop: 16 }} onClick={handleClean}>
                🗑️ Delete All Dead Code — Save {MOCK_REPO.stats.savingsPercent}%
              </button>
            )}

            {step === "cleaned" && (
              <div className={`${styles.successBanner} glass-card`}>
                <span style={{ fontSize: 24 }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent-green)" }}>Repo cleaned. {MOCK_REPO.stats.savingsPercent}% lighter.</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                    5 files · 4 packages · 17 functions removed. Zero breakages detected.
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
