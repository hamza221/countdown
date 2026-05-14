## 2026-05-14 - Accessibility of Dynamic UI Elements
**Learning:** Asynchronous dynamic UI elements (such as delay badges and loading states) often update independently without a page reload. Screen readers must be explicitly instructed to monitor and announce these updates.
**Action:** Always add `role="status"` and `aria-live="polite"` (or `assertive`) to elements that change dynamically to ensure accessibility. Additionally, add `aria-hidden="true"` to decorative SVGs or icons so screen readers can ignore them.
