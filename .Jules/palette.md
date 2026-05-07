
## 2026-05-07 - Accessible Asynchronous UIs and Decorative Icons
**Learning:** Dynamic UI elements that update asynchronously without page reloads (e.g., loading states, delay badges) require `role="status"` and `aria-live="polite"` (or `assertive`) to ensure screen readers monitor and announce the changes. Additionally, decorative SVGs and icons must be explicitly hidden from screen readers using `aria-hidden="true"` to prevent confusion.
**Action:** Always verify that components with dynamically changing states or loading statuses include the appropriate ARIA live region attributes, and ensure all decorative visual elements have `aria-hidden="true"`.
