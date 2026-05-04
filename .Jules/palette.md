## 2025-05-04 - Screen Reader Support for Dynamic Countdown UI
**Learning:** For dynamic UI elements that update asynchronously without page reloads (e.g., loading states, delay badges, arrival messages), they are not automatically announced by screen readers.
**Action:** Always add `role="status"` and `aria-live="polite"` (or `assertive`) to these types of dynamic containers to ensure screen readers monitor and announce the changes as they happen.
