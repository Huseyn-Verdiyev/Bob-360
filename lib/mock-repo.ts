// Mock repository data — simulates a real "broken" repo for demo purposes.
// When IBM Bob API key arrives, these will be replaced with real API responses.

export const MOCK_REPO = {
  name: "ecommerce-platform",
  files: [
    // Active files
    { path: "src/app.js",              type: "file", status: "active",  size: 4200 },
    { path: "src/routes/auth.js",      type: "file", status: "active",  size: 2100 },
    { path: "src/routes/products.js",  type: "file", status: "active",  size: 3400 },
    { path: "src/routes/orders.js",    type: "file", status: "active",  size: 2800 },
    { path: "src/models/User.js",      type: "file", status: "active",  size: 1900 },
    { path: "src/models/Product.js",   type: "file", status: "active",  size: 1600 },
    { path: "src/utils/helpers.js",    type: "file", status: "active",  size: 1200 },

    // Dead files — never imported, never called
    { path: "src/utils/oldAuth.js",    type: "file", status: "dead",    size: 890,  reason: "Replaced by auth.js in 2023. 0 imports found." },
    { path: "src/helpers/format.js",   type: "file", status: "dead",    size: 450,  reason: "formatDate() function also exists in helpers.js line 34." },
    { path: "src/legacy/payment_v1.js",type: "file", status: "dead",    size: 2300, reason: "Legacy payment module. Stripe SDK replaced it entirely." },
    { path: "src/temp/test_data.js",   type: "file", status: "dead",    size: 780,  reason: "Temporary test data. Never imported in production code." },
    { path: "src/unused/analytics.js", type: "file", status: "dead",    size: 1100, reason: "Analytics module abandoned. Was never connected to any route." },
  ],

  packages: {
    active: ["express", "mongoose", "stripe", "jsonwebtoken", "bcrypt", "cors"],
    dead: [
      { name: "moment",     version: "2.29.4", reason: "date-fns is used everywhere. moment.js is never imported." },
      { name: "lodash",     version: "4.17.21",reason: "Only _.cloneDeep was used. Replaced with structuredClone() natively." },
      { name: "request",    version: "2.88.2", reason: "Deprecated package. axios handles all HTTP calls." },
      { name: "node-uuid",  version: "1.4.8",  reason: "crypto.randomUUID() is used instead. This package has 2 security vulnerabilities." },
    ],
  },

  stats: {
    totalFiles: 12,
    deadFiles: 5,
    totalPackages: 10,
    deadPackages: 4,
    totalSize: "2.4 MB",
    projectedSize: "1.1 MB",
    savingsPercent: 54,
    deadFunctions: 17,
  },
};

// ─── DOMINO PREVENTER DATA ──────────────────────────────────────────────────
export const MOCK_CHANGE = {
  file: "src/models/User.js",
  field: { from: "user_id", to: "userId" },
  affectedFiles: [
    {
      path: "src/routes/auth.js",
      line: 42,
      snippet: 'const user = await User.findOne({ user_id: req.body.id });',
      severity: "critical",
    },
    {
      path: "src/routes/orders.js",
      line: 17,
      snippet: 'filter: { user_id: currentUser }',
      severity: "critical",
    },
    {
      path: "frontend/src/components/Profile.jsx",
      line: 88,
      snippet: 'const uid = data.user_id ?? session.user_id;',
      severity: "critical",
    },
    {
      path: "frontend/src/api/client.js",
      line: 23,
      snippet: 'headers: { "X-User-Id": user.user_id }',
      severity: "warning",
    },
  ],
};

// ─── 3AM SAVIOR DATA ────────────────────────────────────────────────────────
export const MOCK_ERROR_LOG = `[ERROR] 2026-05-14 03:17:42 UTC
TypeError: Cannot read properties of undefined (reading 'stripeId')
    at processPayment (src/services/payment_gateway.js:89:23)
    at async OrderController.createOrder (src/controllers/orders.js:156:5)
    at async Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)

Stack Trace:
  payment_gateway.js:89   → user.stripeId is undefined
  orders.js:156           → await processPayment(user, cart)
  auth.middleware.js:44   → req.user = await User.findById(token.id)

Request: POST /api/orders/create
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)
IP: 185.234.xx.xx | Session: sess_abc123`;

export const MOCK_ROOT_CAUSE = {
  crashFile: "src/services/payment_gateway.js",
  crashLine: 89,
  rootCause: "src/models/User.js",
  rootCauseLine: 34,
  triggeringPR: {
    number: "#PR-247",
    author: "Farid Hashimli",
    date: "2 days ago",
    message: "refactor: rename stripeCustomerId → stripeId for consistency",
  },
  explanation:
    "PR #247 renamed the field `stripeCustomerId` to `stripeId` in User.js, but payment_gateway.js was still referencing the old field name. When a user attempts checkout, payment_gateway.js reads `user.stripeId` which now correctly exists — but 3 other service files still reference `user.stripeCustomerId` causing undefined errors on specific checkout paths.",
  fix: {
    file: "src/services/payment_gateway.js",
    line: 89,
    before: "const charge = await stripe.charges.create({ customer: user.stripeCustomerId });",
    after:  "const charge = await stripe.charges.create({ customer: user.stripeId });",
  },
};

// ─── PR TRANSLATOR DATA ─────────────────────────────────────────────────────
export const MOCK_PR = {
  technical: `## PR #251: Optimize database query performance & add Redis caching layer

### Changes
- Added compound index on \`orders\` collection: \`{ userId: 1, createdAt: -1 }\`
- Implemented Redis cache with 5-min TTL for product catalog queries  
- Refactored N+1 query in OrderController.getHistory() using \$lookup aggregation
- Added connection pooling (maxPoolSize: 10) to mongoose config
- Removed deprecated \`ensureIndex()\` calls, replaced with \`createIndex()\`
- Bundle size reduced: removed moment.js (67KB gzipped) → date-fns (13KB)

### Performance
- getHistory() response: 1,847ms → 210ms (88% improvement)
- Product catalog: 340ms → 45ms (cached)
- DB connections stabilized: no more connection pool exhaustion under load`,

  executive: {
    headline: "🚀 App Performance Dramatically Improved",
    bullets: [
      "Order history loads **8x faster** — from almost 2 seconds to under 0.2 seconds",
      "Product browsing is now nearly **instant** (cached results)",
      "App is now stable under high traffic — no more slowdowns during peak hours",
      "App download size reduced, meaning faster load times for mobile users",
    ],
    impact: "Estimated to reduce customer checkout abandonment by ~15% based on industry benchmarks for sub-200ms response times.",
    technicalDebt: "2 legacy issues resolved, preventing potential future outages.",
  },
};
