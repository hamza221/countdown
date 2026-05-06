## 2024-05-06 - Accessible Dynamic UI Updates
**Learning:** For dynamic UI elements that update asynchronously without a full page reload (e.g. loading screens, delay indicators, and final arrival messages), screen readers may fail to announce these changes by default.
**Action:** Always add `role="status"` and `aria-live="polite"` to containers that inject dynamic, status-related content asynchronously to ensure screen readers announce the changes properly. Ensure decorative images and SVGs have `aria-hidden="true"`.
