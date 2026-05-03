## 2023-10-24 - Dynamic Status Announcements
**Learning:** For dynamic information like flight delay updates and loading statuses that change without page reloads, screen readers may ignore them unless explicitly told to monitor them. Setting `role="status"` and `aria-live="polite"` ensures these important updates are announced to assistive technology without interrupting the user.
**Action:** Always add `role="status"` and `aria-live="polite"` (or `assertive` if critical) to dynamic text elements or badges that update asynchronously.
