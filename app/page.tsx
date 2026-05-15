"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const FEATURES = [
  {
    icon: "🧩",
    color: "amber",
    title: "Domino Preventer",
    desc: "Detects cascade failures before they happen. Change one field — Bob warns you about all 4 files that will break.",
  },
  {
    icon: "🗑️",
    color: "cyan",
    title: "Code Diet",
    desc: "Finds dead code, unused packages, and orphaned files. Cleans your repo silently. Makes it 50% lighter.",
  },
  {
    icon: "👔",
    color: "purple",
    title: "PR Translator",
    desc: "Converts technical pull requests into plain-English release notes. Your CEO will actually understand what shipped.",
  },
  {
    icon: "🚨",
    color: "red",
    title: "3AM Savior",
    desc: "Paste a crash log at 3AM. Bob traces it to the exact PR, the exact developer, and gives you a 1-click fix.",
  },
];

const STATS = [
  { value: "4x", label: "Faster Debugging" },
  { value: "54%", label: "Repo Size Reduction" },
  { value: "8×", label: "Faster Load Times" },
  { value: "0", label: "Missed Cascades" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "The AI Tech Lead that never sleeps.";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 48);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <main className={styles.main}>
      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <span className={styles.navLogoIcon}>⬡</span>
          <span className={styles.navLogoText}>Bob <span className="gradient-text">360</span></span>
        </div>
        <div className={styles.navLinks}>
          <span className="badge badge-blue">
            <span className="dot pulse"></span>
            Powered by IBM Bob
          </span>
        </div>
        <Link href="/dashboard" className="btn btn-primary btn-sm">
          Open Dashboard →
        </Link>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className="badge badge-blue">
            <span className="dot pulse"></span>
            IBM Bob Hackathon 2026
          </span>
        </div>

        <h1 className={styles.heroTitle}>
          <span className="gradient-text">Bob 360</span>
        </h1>

        <p className={styles.heroSubtitle}>
          {mounted ? typedText : fullText}
          {mounted && typedText.length < fullText.length && (
            <span className="terminal-cursor" />
          )}
        </p>

        <p className={styles.heroTagline}>
          From the first line of code, to the 3 AM crash —<br />
          <strong>we&apos;ve got your repo covered.</strong>
        </p>

        <div className={styles.heroCta}>
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            🚀 Launch Dashboard
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
          >
            ⭐ GitHub Repo
          </a>
        </div>

        {/* Floating terminal preview */}
        <div className={`${styles.terminalPreview} animate-fade-in-up delay-400`}>
          <div className="terminal">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span style={{ marginLeft: 8, fontSize: 12, color: "var(--text-muted)" }}>
                bob360 — analyzing repository
              </span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line prompt">bob360 analyze ./ecommerce-platform</div>
              <div className="terminal-line info">  ✦ Scanning 247 files across 18 directories...</div>
              <div className="terminal-line warning">  ⚠ Found 5 dead files (1.3 MB bloat)</div>
              <div className="terminal-line warning">  ⚠ Found 4 unused packages (moment, lodash, request, node-uuid)</div>
              <div className="terminal-line error">  ✗ Found 1 cascade risk: user_id → userId rename affects 4 files</div>
              <div className="terminal-line success">  ✓ PR #251 translated → executive summary ready</div>
              <div className="terminal-line success">  ✓ Crash log traced → root cause: PR #247 by Farid Hashimli</div>
              <div className="terminal-line muted" style={{ marginTop: 8 }}>
                Summary: Repo is 54% lighter. 1 cascade blocked. 1 outage prevented.
              </div>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className={styles.statsBar}>
        {STATS.map((s) => (
          <div key={s.label} className={`${styles.statItem} glass-card`}>
            <div className={`stat-number gradient-text`}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Four problems. One guardian.</h2>
          <p className={styles.sectionSub}>
            Every stage of software development — from writing the first function
            to recovering from a production crash — Bob 360 has you covered.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`${styles.featureCard} glass-card animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`${styles.featureIcon} ${styles[`featureIcon_${f.color}`]}`}>
                {f.icon}
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2>The full SDLC. Covered.</h2>
          <p className={styles.sectionSub}>
            Bob 360 is the only tool that watches over your entire software
            development lifecycle — not just autocompleting your code.
          </p>
        </div>
        <div className={styles.lifecycle}>
          {[
            { step: "01", label: "Write", icon: "✏️", color: "blue",   desc: "Domino Preventer warns you in real-time as you edit" },
            { step: "02", label: "Review", icon: "🔍", color: "cyan",   desc: "Code Diet cleans dead weight before merge" },
            { step: "03", label: "Release", icon: "📦", color: "purple", desc: "PR Translator creates executive release notes" },
            { step: "04", label: "Recover", icon: "🚨", color: "red",   desc: "3AM Savior traces crashes to root cause instantly" },
          ].map((item, i) => (
            <div key={item.step} className={styles.lifecycleItem}>
              <div className={`${styles.lifecycleStep} ${styles[`step_${item.color}`]}`}>
                <span>{item.icon}</span>
                <strong>{item.label}</strong>
              </div>
              <p className={styles.lifecycleDesc}>{item.desc}</p>
              {i < 3 && <div className={styles.lifecycleArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaCard} glass-card`}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>
            Ready to meet your <span className="gradient-text">AI Tech Lead</span>?
          </h2>
          <p className={styles.ctaDesc}>
            No setup. No configuration. Just paste your repo and watch Bob 360 work.
          </p>
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            🚀 Open Dashboard — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <span className={styles.navLogoIcon}>⬡</span>
          <span>Bob <strong>360</strong></span>
        </div>
        <p className={styles.footerText}>
          Built with ❤️ for IBM Bob Hackathon 2026 · Powered by IBM Bob AI
        </p>
        <p className={styles.footerText} style={{ marginTop: 4, color: "var(--text-muted)", fontSize: 12 }}>
          Team: Farid Hashimli &amp; partner
        </p>
      </footer>
    </main>
  );
}
