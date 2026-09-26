## 2026-09-26 - Mousemove Event Optimization
**Learning:** The custom cursor implementation spawned a new setTimeout on every single mousemove event, which causes severe memory allocation overhead and jank on lower-end devices.
**Action:** Use requestAnimationFrame and cache the mouse coordinates to update UI components smoothly without overwhelming the event loop.
