# Bob 360 Premium Styling Guide

## 🎨 High-Tech Glassmorphism Aesthetic

This guide documents the premium CSS classes available for the Bob 360 dashboard, featuring a dark-mode, high-tech startup aesthetic with glassmorphism effects, glowing elements, and CRT-inspired animations.

---

## 📦 Enhanced Global Styles (globals.css)

### Terminal Components

#### Basic Terminal
```tsx
<div className="terminal">
  <div className="terminal-header">
    <span className="terminal-dot red" />
    <span className="terminal-dot yellow" />
    <span className="terminal-dot green" />
  </div>
  <div className="terminal-body">
    <div className="terminal-line prompt">npm run dev</div>
    <div className="terminal-line success">✓ Server started</div>
    <div className="terminal-line error">✗ Connection failed</div>
  </div>
</div>
```

#### Terminal with Glow Effect
```tsx
<div className="terminal terminal-glow">
  {/* Premium red glow for error logs */}
</div>
```

**Features:**
- CRT scanline effect overlay
- Glowing terminal dots with box-shadow
- Stack trace styling with arrow indicators
- Animated cursor with glow effect

### Status Badges

#### Standard Badges
```tsx
<span className="badge badge-blue">Active</span>
<span className="badge badge-green">Success</span>
<span className="badge badge-red">Critical</span>
<span className="badge badge-amber">Warning</span>
<span className="badge badge-purple">Premium</span>
<span className="badge badge-cyan">Info</span>
```

#### Glowing Badges
```tsx
<span className="badge badge-red badge-glow">
  <span className="dot pulse" />
  Critical Alert
</span>
```

**Features:**
- Smooth transitions and hover effects
- Pulsing dot indicators
- Glowing variants with `badge-glow` class
- Animated brightness and scale effects

---

## 🚀 Panel-Specific Styles (panels.module.css)

### Error Log Window

Premium terminal-style error log with CRT effects:

```tsx
import styles from './panels.module.css';

<div className={styles.errorLogWindow}>
  <div className={styles.errorLogHeader}>
    <div className={styles.errorLogTitle}>
      🚨 SYSTEM ERROR
    </div>
    <div className={styles.errorLogTimestamp}>
      2026-05-16 03:17:42 UTC
    </div>
  </div>
  <div className={styles.errorLogBody}>
    <div className={`${styles.errorLogLine} ${styles.critical}`}>
      TypeError: Cannot read properties of undefined
    </div>
    <div className={`${styles.errorLogLine} ${styles.stackTrace}`}>
      at processPayment (payment_gateway.js:89:23)
    </div>
    <div className={`${styles.errorLogLine} ${styles.metadata}`}>
      Request: POST /api/orders/create
    </div>
  </div>
</div>
```

**Features:**
- Animated scanline overlay
- Moving scan line effect
- Flicker animation for authenticity
- Red glow and shadow effects
- Automatic fade-in for log lines

### Glowing Alert Badges

Premium alert badges with holographic effects:

```tsx
import styles from './panels.module.css';

// Critical Alert
<div className={`${styles.alertBadge} ${styles.alertBadgeCritical}`}>
  <span className={styles.alertBadgeDot} />
  CRITICAL
</div>

// Warning Alert
<div className={`${styles.alertBadge} ${styles.alertBadgeWarning}`}>
  <span className={styles.alertBadgeDot} />
  WARNING
</div>

// Success Alert
<div className={`${styles.alertBadge} ${styles.alertBadgeSuccess}`}>
  <span className={styles.alertBadgeDot} />
  RESOLVED
</div>

// Info Alert
<div className={`${styles.alertBadge} ${styles.alertBadgeInfo}`}>
  <span className={styles.alertBadgeDot} />
  SCANNING
</div>
```

**Features:**
- Glowing background with blur effect
- Pulsing dot indicators
- Hover scale and lift effects
- Color-coded severity levels
- Smooth animations

### High-Tech Utility Classes

#### Glass Panel
```tsx
<div className={styles.glassPanel}>
  {/* Premium glassmorphism effect */}
</div>
```

#### Neon Border
```tsx
<div className={styles.neonBorder}>
  {/* Animated gradient border */}
</div>
```

#### Holographic Text
```tsx
<h1 className={styles.holographicText}>
  Bob 360 AI Assistant
</h1>
```

#### Data Stream Effect
```tsx
<span className={styles.dataStream}>
  Analyzing 247 files...
</span>
```

#### Status Indicators
```tsx
<div className={`${styles.statusIndicator} ${styles.statusIndicatorOnline}`} />
<div className={`${styles.statusIndicator} ${styles.statusIndicatorError}`} />
<div className={`${styles.statusIndicator} ${styles.statusIndicatorWarning}`} />
<div className={`${styles.statusIndicator} ${styles.statusIndicatorProcessing}`} />
```

#### Code Editor Premium
```tsx
<div className={styles.codeEditorPremium}>
  {/* Enhanced code editor with hover effects */}
</div>

{/* Highlight specific lines */}
<div className={styles.codeHighlightGlow}>
  const user = await User.findOne({ userId });
</div>
```

---

## 🎬 Available Animations

### From globals.css:
- `blink` - Cursor blinking
- `pulse-dot` - Pulsing dot indicator
- `fadeInUp` - Fade in with upward motion
- `fadeIn` - Simple fade in
- `slideInRight` - Slide from right
- `shimmer` - Gradient shimmer effect
- `float` - Floating motion
- `glow-pulse` - Pulsing glow effect
- `spin` - Rotation
- `shake` - Shake effect
- `alarm-flash` - Flashing background

### New animations:
- `badge-glow` - Badge brightness pulse
- `scan-line` - CRT scan line movement
- `flicker` - Screen flicker effect

### Usage:
```tsx
<div className="animate-fade-in-up delay-200">
  Content appears with delay
</div>
```

---

## 🎨 Color Palette

### Accent Colors:
- **Blue**: `var(--accent-blue)` - #3b82f6
- **Cyan**: `var(--accent-cyan)` - #06b6d4
- **Green**: `var(--accent-green)` - #22c55e
- **Red**: `var(--accent-red)` - #ef4444
- **Amber**: `var(--accent-amber)` - #f59e0b
- **Purple**: `var(--accent-purple)` - #a855f7

### Text Colors:
- **Primary**: `var(--text-primary)` - #f1f5f9
- **Secondary**: `var(--text-secondary)` - #94a3b8
- **Muted**: `var(--text-muted)` - #475569

### Backgrounds:
- **Primary**: `var(--bg-primary)` - #07070f
- **Secondary**: `var(--bg-secondary)` - #0d0d1a
- **Card**: `var(--bg-card)` - rgba(255,255,255,0.04)

---

## 💡 Best Practices

1. **Layer Effects**: Combine multiple classes for maximum impact
   ```tsx
   <div className={`${styles.glassPanel} ${styles.neonBorder}`}>
   ```

2. **Use Semantic Colors**: Match badge colors to severity
   - Critical/Error → Red
   - Warning → Amber
   - Success → Green
   - Info → Blue/Cyan

3. **Animate Thoughtfully**: Use delays for staggered animations
   ```tsx
   <div className="animate-fade-in-up delay-100">First</div>
   <div className="animate-fade-in-up delay-200">Second</div>
   ```

4. **Accessibility**: Ensure sufficient contrast and don't rely solely on color

5. **Performance**: Limit the number of animated elements on screen

---

## 🔧 Customization

All styles use CSS custom properties (variables) for easy theming. Modify values in `globals.css`:

```css
:root {
  --accent-blue: #3b82f6;
  --radius-lg: 16px;
  /* etc. */
}
```

---

## 📚 Examples

### Complete Error Log Panel
```tsx
import styles from './panels.module.css';

export function ErrorLogPanel() {
  return (
    <div className={styles.errorLogWindow}>
      <div className={styles.errorLogHeader}>
        <div className={styles.errorLogTitle}>
          🚨 PRODUCTION ERROR
        </div>
        <div className={styles.errorLogTimestamp}>
          2026-05-16 03:17:42 UTC
        </div>
      </div>
      <div className={styles.errorLogBody}>
        <div className={`${styles.errorLogLine} ${styles.critical}`}>
          [ERROR] TypeError: Cannot read properties of undefined (reading 'stripeId')
        </div>
        <div className={`${styles.errorLogLine} ${styles.stackTrace}`}>
          at processPayment (src/services/payment_gateway.js:89:23)
        </div>
        <div className={`${styles.errorLogLine} ${styles.stackTrace}`}>
          at async OrderController.createOrder (src/controllers/orders.js:156:5)
        </div>
        <div className={`${styles.errorLogLine} ${styles.metadata}`}>
          Request: POST /api/orders/create
        </div>
        <div className={`${styles.errorLogLine} ${styles.metadata}`}>
          IP: 185.234.xx.xx | Session: sess_abc123
        </div>
      </div>
    </div>
  );
}
```

### Alert Badge Row
```tsx
import styles from './panels.module.css';

export function AlertBadges() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div className={`${styles.alertBadge} ${styles.alertBadgeCritical}`}>
        <span className={styles.alertBadgeDot} />
        4 CRITICAL
      </div>
      <div className={`${styles.alertBadge} ${styles.alertBadgeWarning}`}>
        <span className={styles.alertBadgeDot} />
        2 WARNINGS
      </div>
      <div className={`${styles.alertBadge} ${styles.alertBadgeSuccess}`}>
        <span className={styles.alertBadgeDot} />
        ALL FIXED
      </div>
    </div>
  );
}
```

---

**Built with ❤️ for Bob 360 - The AI Assistant That Never Sleeps**