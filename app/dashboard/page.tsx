"use client";
import { useState } from "react";
import Link from "next/link";
import DominoPanel from "@/components/panels/DominoPanel";
import DietPanel from "@/components/panels/DietPanel";
import TranslatorPanel from "@/components/panels/TranslatorPanel";
import SaviorPanel from "@/components/panels/SaviorPanel";
import styles from "./dashboard.module.css";

const PANELS = [
  { id: "domino",     icon: "🧩", label: "Domino Preventer", badge: "amber",  badgeText: "1 Risk" },
  { id: "diet",       icon: "🗑️", label: "Code Diet",        badge: "cyan",   badgeText: "5 Dead Files" },
  { id: "translator", icon: "👔", label: "PR Translator",    badge: "purple", badgeText: "Ready" },
  { id: "savior",     icon: "🚨", label: "3AM Savior",       badge: "red",    badgeText: "Alert!" },
];

export default function DashboardPage() {
  const [active, setActive] = useState("domino");

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
              <div className={styles.repoName}>ecommerce-platform</div>
              <div className={styles.repoMeta}>12 files · 4 packages</div>
            </div>
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
            <h1 className={styles.contentTitle}>
              {PANELS.find((p) => p.id === active)?.icon}{" "}
              {PANELS.find((p) => p.id === active)?.label}
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
              IBM Bob Connected
            </span>
          </div>
        </header>

        {/* ── IMPACT BAR ────────────────────────────────────────── */}
        <div className={styles.impactBar}>
          {[
            { icon: "🧩", value: "1",   label: "Cascade Blocked",  color: "amber" },
            { icon: "🗑️", value: "54%", label: "Repo Lighter",     color: "cyan"  },
            { icon: "👔", value: "1",   label: "Report Generated", color: "purple"},
            { icon: "🚨", value: "43s", label: "Downtime Saved",   color: "red"   },
          ].map((s) => (
            <div key={s.label} className={`${styles.impactItem}`}>
              <span className={styles.impactIcon}>{s.icon}</span>
              <span className={`${styles.impactValue} gradient-text`}>{s.value}</span>
              <span className={styles.impactLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.panelContainer} key={active}>
          {active === "domino"     && <DominoPanel />}
          {active === "diet"       && <DietPanel />}
          {active === "translator" && <TranslatorPanel />}
          {active === "savior"     && <SaviorPanel />}
        </div>
      </main>
    </div>
  );
}
