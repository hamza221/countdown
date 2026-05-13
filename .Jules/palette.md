## 2024-05-13 - Asynchronous UI Updates & ARIA Attributes
**Learning:** For dynamic UI elements that update asynchronously without page reloads (such as loading states and delay badges), screen readers will not announce the changes by default.
**Action:** Always add `role="status"` and `aria-live="polite"` (or `assertive`) to these elements to ensure screen readers monitor and announce the changes. Additionally, always add `aria-hidden="true"` to decorative SVGs and icons so they are skipped by screen readers.
