## 2025-04-25 - Screen Reader Optimization for Fast-Updating Timers
**Learning:** Fast-updating visual text (like countdowns showing milliseconds) causes screen readers to spam unreadable gibberish as they try to keep up.
**Action:** When using timers that update frequently (e.g. `requestAnimationFrame`), use a visually hidden `aria-label` that limits precision to minutes or seconds (e.g., "X days, Y hours, Z minutes") instead of letting the screen reader try to read changing milliseconds.
