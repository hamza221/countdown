## 2024-05-16 - Add ARIA live attributes for dynamic states
**Learning:** Found that dynamic UI elements that update asynchronously without page reloads (loading states, delay badges) were not announced by screen readers. Adding `role="status"` and `aria-live="polite"` improves accessibility by notifying users.
**Action:** Use these attributes consistently on dynamic UI components. Also add `aria-hidden="true"` to purely decorative SVGs.
