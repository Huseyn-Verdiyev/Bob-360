# Bob 360 — The AI Tech Lead that never sleeps

> *From the first line of code, to the 3AM crash — we've got your repo covered.*

Built for the **IBM Bob Hackathon 2026** · Powered by **IBM Bob**

## 🚀 Live Demo
[bob-360.vercel.app](https://bob-360.vercel.app)

---

## 💡 What is Bob 360?

Every software team bleeds time. Bob 360 is an AI-powered developer intelligence dashboard that watches your **entire software lifecycle** — built on IBM Bob's unique full-repository context understanding.

| Module | Problem Solved |
|---|---|
| 🧩 **Domino Preventer** | Detects cascade failures BEFORE they happen. Rename a field — Bob warns you which 4 files will break. |
| 🗑️ **Code Diet** | Finds dead files, zombie packages & orphaned functions. Cleans them safely with 1 click. |
| 👔 **PR Translator** | Converts technical pull requests into plain-English executive release notes instantly. |
| 🚨 **3AM Savior** | Paste a crash log at 3AM. Bob traces it to the exact PR, developer, and gives you a 1-click fix. |

---

## 🎯 Why IBM Bob Makes This Possible

Standard AI tools see a **code snippet**. IBM Bob sees your **entire repository** — its architecture, file dependencies, import chains, and git history.

- **Domino Preventer** traces references across every file in the codebase
- **Code Diet** checks every import chain to ensure safe deletion
- **PR Translator** understands the business impact of technical changes
- **3AM Savior** cross-references git history + codebase to find root cause

*IBM Bob's full-repo context is not a feature. It's the foundation everything is built on.*

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS + Design System |
| AI Backend | IBM Bob API |
| Deployment | Vercel |

---

## 🛠️ Run Locally

```bash
git clone https://github.com/[username]/bob-360
cd bob-360
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Add your IBM Bob API key to `.env.local`:

```env
IBM_BOB_API_KEY=your_api_key_here
IBM_BOB_API_URL=https://api.ibmbob.com/v1
```

---

## 📁 Project Structure

```
bob-360/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # 4-panel dashboard
│   └── api/                  # IBM Bob API routes
│       ├── analyze/          # Domino Preventer
│       ├── clean/            # Code Diet
│       ├── translate/        # PR Translator
│       └── crash/            # 3AM Savior
├── components/panels/        # 4 interactive panels
├── lib/
│   ├── bob-client.ts         # IBM Bob API wrapper
│   └── mock-repo.ts          # Demo data
└── IBM_Bob_Report.pdf        # Exported IBM Bob sessions
```

---

## 📊 IBM Bob Integration

Bob 360 uses IBM Bob in 4 distinct workflows:

1. **`POST /api/analyze`** — Full repo scan for cascade impact of a field change
2. **`POST /api/clean`** — Dead code detection across all files and packages
3. **`POST /api/translate`** — Technical PR → executive-readable release notes
4. **`POST /api/crash`** — Error log → root cause → 1-click fix

See `IBM_Bob_Report.pdf` for the full exported IBM Bob session report.

---

## 📈 Demo Impact (This Session)

| Metric | Result |
|---|---|
| Cascades blocked | 1 (4 files saved from breaking) |
| Repo size reduction | 54% (5 files, 4 packages, 17 functions) |
| Executive reports | 1 generated in 3 seconds |
| Server downtime saved | 43 seconds vs. 40+ minutes manual |

---

## 👥 Team

- **[Your Name]** — UI/UX, Frontend, Dashboard, Landing Page
- **Farid Hashimli** — Backend, IBM Bob Integration, API Routes

---

## 📄 License

MIT © 2026 Bob 360 Team
