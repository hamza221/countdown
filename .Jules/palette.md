## 2024-05-20 - Adding ARIA attributes to Countdown App
**Learning:** Flight countdown applications with moving graphics and dynamic numbers require `role="timer"` and `aria-live` to remain accessible. Decorative elements representing the route line often read poorly on screen readers and should be hidden.
**Action:** Always verify decorative DOM elements are ignored by screen readers, and critical live data is announced correctly.
