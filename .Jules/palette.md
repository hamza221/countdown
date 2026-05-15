## 2024-10-24 - Enhance Accessibility for Dynamic Elements and SVGs
**Learning:** Screen readers need context for elements that dynamically update without page reloads, such as loading states or delay badges. They also need to know which elements to ignore, such as purely decorative icons or SVGs.
**Action:** Always add `role="status"` and `aria-live="polite"` (or `assertive`) to dynamic UI elements to ensure screen readers monitor and announce their changes. Additionally, always add `aria-hidden="true"` to decorative SVGs and icons so they are skipped by screen readers.
