"use client";
import Link from "next/link";
import styles from "./page.module.css";

const MODULES = [
  {
    title: "Domino Preventer",
    desc: "Rename one field. Bob shows you every file that will break — before you commit.",
    tag: "Cascade Protection",
  },
  {
    title: "Code Diet",
    desc: "Dead files, zombie packages, orphaned functions. Bob finds them and removes them safely.",
    tag: "Cleanup",
  },
  {
    title: "PR Translator",
    desc: "Your CEO doesn't know what a compound index is. Bob translates your PR into plain English.",
    tag: "Communication",
  },
  {
    title: "3AM Savior",
    desc: "Production is down. Paste the crash log. Bob points to the exact PR that caused it.",
    tag: "Incident Response",
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>

      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>Bob 360</span>
        <div className={styles.navRight}>
          <span className={styles.navBadge}>IBM Bob Hackathon 2026</span>
          <Link href="/dashboard" className={styles.navBtn}>
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Developer Intelligence Dashboard</p>
        <h1 className={styles.heroTitle}>
          The AI tech lead<br />that never sleeps.
        </h1>
        <p className={styles.heroSub}>
          Bob 360 watches your entire repository — not just the file you have open.
          It catches cascade failures, cleans dead code, translates PRs for executives,
          and traces production crashes back to the exact commit that caused them.
        </p>
        <div className={styles.heroCta}>
          <Link href="/dashboard" className={styles.btnPrimary}>
            Open Dashboard
          </Link>
          <a
            href="https://github.com/Huseyn-Verdiyev/Bob-360"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* DIVIDER */}
      <div className={styles.divider} />

      {/* MODULES */}
      <section className={styles.modules}>
        <p className={styles.sectionLabel}>What it does</p>
        <h2 className={styles.sectionTitle}>Four problems, one dashboard.</h2>
        <div className={styles.moduleGrid}>
          {MODULES.map((m) => (
            <div key={m.title} className={styles.moduleCard}>
              <span className={styles.moduleTag}>{m.tag}</span>
              <h3 className={styles.moduleTitle}>{m.title}</h3>
              <p className={styles.moduleDesc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className={styles.divider} />

      {/* WHY SECTION */}
      <section className={styles.why}>
        <div className={styles.whyContent}>
          <p className={styles.sectionLabel}>Why this works</p>
          <h2 className={styles.sectionTitle}>
            Most AI tools see a snippet.<br />Bob sees the whole repo.
          </h2>
          <p className={styles.whyText}>
            Standard AI coding assistants work on whatever file you have open.
            They can autocomplete a function, but they have no idea what will
            break when you rename a database field three directories away.
          </p>
          <p className={styles.whyText}>
            IBM Bob loads your entire repository into context. Bob 360 is built
            on top of that foundation — four tools that only make sense when you
            have the full picture.
          </p>
        </div>
        <div className={styles.whyStats}>
          <div className={styles.statRow}>
            <span className={styles.statNum}>54%</span>
            <span className={styles.statLabel}>average repo size reduction</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statNum}>43s</span>
            <span className={styles.statLabel}>to resolve a production crash</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statNum}>0</span>
            <span className={styles.statLabel}>cascade failures missed</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>Bob 360</span>
        <p className={styles.footerText}>
          Built by Huseyn Verdiyev & Farid Hashimli for IBM Bob Hackathon 2026
        </p>
      </footer>

    </main>
  );
}
