"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import DominoPanel from "@/components/panels/DominoPanel";
import DietPanel from "@/components/panels/DietPanel";
import TranslatorPanel from "@/components/panels/TranslatorPanel";
import SaviorPanel from "@/components/panels/SaviorPanel";
import type { BobResult } from "@/lib/bob-client";
import type { GitHubRepoContext } from "@/lib/github";
import styles from "./dashboard.module.css";

const PANELS = [
  { id: "domino",     icon: "🧩", label: "Domino Preventer", badge: "amber",  badgeText: "1 Risk" },
  { id: "diet",       icon: "🗑️", label: "Code Diet",        badge: "cyan",   badgeText: "5 Dead Files" },
  { id: "translator", icon: "👔", label: "PR Translator",    badge: "purple", badgeText: "Ready" },
  { id: "savior",     icon: "🚨", label: "3AM Savior",       badge: "red",    badgeText: "Alert!" },
];

export default function DashboardPage() {
  const [active, setActive] = useState("domino");
  const [repoUrl, setRepoUrl] = useState("https://github.com/Huseyn-Verdiyev/Bob-360");
  const [repo, setRepo] = useState<GitHubRepoContext | null>(null);
  const [bob, setBob] = useState<BobResult | null>(null);
  const [repoStatus, setRepoStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [repoError, setRepoError] = useState("");
  const [analysisUsed, setAnalysisUsed] = useState(false);
  const activePanel = PANELS.find((p) => p.id === active) ?? PANELS[0];

  const connectRepo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (analysisUsed) {
      setRepoStatus("error");
      setRepoError("This browser has already used its one repository analysis.");
      return;
    }

    setRepoStatus("loading");
    setRepoError("");

    try {
      const res = await fetch("/api/repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = (await res.json()) as {
        repo?: GitHubRepoContext;
        bob?: BobResult;
        error?: string;
      };

      if (!res.ok || !data.repo) {
        throw new Error(data.error ?? "Repo could not be connected.");
      }

      setRepo(data.repo);
      setBob(data.bob ?? null);
      setRepoStatus("ready");
      setAnalysisUsed(true);
    } catch (error) {
      setRepoStatus("error");
      setRepoError(error instanceof Error ? error.message : "Repo could not be connected.");
    }
  };

  return (
    <div className={styles.layout}>
      {/* ── SIDEBAR ──────────────────────────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoIcon}>⬡</span>
            <span>Bob <strong>360</strong></span>
          </Link>
          <span className="badge badge-green">
            <span className="dot pulse"></span>
            Active
          </span>
        </div>

        <div className={styles.sidebarRepo}>
          <div className={styles.repoInfo}>
            <span className={styles.repoIcon}>📁</span>
            <div>
              <div className={styles.repoName}>{repo?.fullName ?? "ecommerce-platform"}</div>
              <div className={styles.repoMeta}>
                {repo ? `${repo.files.length} files · ${repo.language}` : "12 files · 4 packages"}
              </div>
            </div>
          </div>
          <div className={styles.repoSignal}>
            <span>Repo context</span>
            <strong>{repo ? `${repo.sourceFiles.length} source files` : "247 refs mapped"}</strong>
          </div>
        </div>

        <div className={styles.sidebarDivider} />

        <nav className={styles.sidebarNav}>
          <div className={styles.navLabel}>Modules</div>
          {PANELS.map((panel) => (
            <button
              key={panel.id}
              id={`nav-${panel.id}`}
              className={`${styles.navItem} ${active === panel.id ? styles.navItemActive : ""}`}
              onClick={() => setActive(panel.id)}
            >
              <span className={styles.navItemIcon}>{panel.icon}</span>
              <span className={styles.navItemLabel}>{panel.label}</span>
              <span className={`badge badge-${panel.badge} ${styles.navBadge}`}>
                {panel.badgeText}
              </span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.bobStatus}>
            <span className={styles.bobStatusDot} />
            <div>
              <div className={styles.bobStatusTitle}>IBM Bob</div>
              <div className={styles.bobStatusSub}>Full repo context loaded</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <main className={styles.content}>
        <header className={styles.contentHeader}>
          <div>
            <div className={styles.headerKicker}>
              IBM Bob Hackathon Demo
              <span>{repo ? `${repo.fullName} indexed` : "Live repository intelligence"}</span>
            </div>
            <h1 className={styles.contentTitle}>
              {activePanel.icon}{" "}
              {activePanel.label}
            </h1>
            <p className={styles.contentSub}>
              {active === "domino"     && "Real-time cascade failure detection across your entire repository."}
              {active === "diet"       && "Identify and remove dead code, unused packages, and orphaned files."}
              {active === "translator" && "Convert technical pull requests into executive-ready release notes."}
              {active === "savior"     && "Paste a crash log — Bob traces it to the root cause and fixes it."}
            </p>
          </div>
          <div className={styles.headerRight}>
            <span className="badge badge-blue">
              <span className="dot pulse" />
              {bob?.provider === "ibm-bob" ? "IBM Bob Live" : "IBM Bob Ready"}
            </span>
          </div>
        </header>

        <section className={styles.repoConnect}>
          <form className={styles.repoForm} onSubmit={connectRepo}>
            <div className={styles.repoFormCopy}>
              <span className={styles.repoFormLabel}>GitHub repository</span>
              <strong>{repo ? repo.description : "Paste a repo link and Bob 360 will build live context."}</strong>
            </div>
            <input
              className={styles.repoInput}
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
              placeholder="https://github.com/owner/repo"
              aria-label="GitHub repository URL"
            />
            <button className="btn btn-primary" type="submit" disabled={repoStatus === "loading" || analysisUsed}>
              {repoStatus === "loading" ? "Connecting..." : analysisUsed ? "Analysis Used" : "Connect Repo"}
            </button>
          </form>
          {repoStatus === "ready" && repo && (
            <div className={styles.repoConnected}>
              <span className="badge badge-green">Connected</span>
              <span>{repo.defaultBranch}</span>
              <span>{Object.keys(repo.languages).slice(0, 3).join(", ") || repo.language}</span>
              <span>{bob?.summary}</span>
            </div>
          )}
          {analysisUsed && repoStatus !== "ready" && (
            <div className={styles.repoLimit}>Each visitor can analyze one GitHub repository once.</div>
          )}
          {repoStatus === "error" && <div className={styles.repoError}>{repoError}</div>}
        </section>

        {/* ── IMPACT BAR ────────────────────────────────────────── */}
        <div className={styles.impactBar}>
          {[
            { icon: "🧩", value: "1",   label: "Cascade Blocked",  color: "amber" },
            { icon: "🗑️", value: "54%", label: "Repo Lighter",     color: "cyan"  },
            { icon: "👔", value: "1",   label: "Report Generated", color: "purple"},
            { icon: "🚨", value: "43s", label: "Downtime Saved",   color: "red"   },
          ].map((s) => (
            <div key={s.label} className={`${styles.impactItem} ${styles[`impactItem_${s.color}`]}`}>
              <span className={styles.impactIcon} aria-hidden="true">{s.icon}</span>
              <span className={`${styles.impactValue} gradient-text`}>{s.value}</span>
              <span className={styles.impactLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.panelContainer} key={active}>
          {active === "domino"     && <DominoPanel repo={repo} />}
          {active === "diet"       && <DietPanel repo={repo} />}
          {active === "translator" && <TranslatorPanel repo={repo} />}
          {active === "savior"     && <SaviorPanel repo={repo} />}
        </div>
      </main>
    </div>
  );
}
