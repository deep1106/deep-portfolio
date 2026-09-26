## 2024-06-13 - [Icon-Only Links and Decorative Arrows A11y]
**Learning:** Found that decorative arrows like '→' in CTA buttons and '↗' in project cards were being read out by screen readers ('Rightwards arrow' and 'North East Arrow'), which disrupts flow before meaningful titles. Also found that 'title' attributes aren't always reliably announced for icon-only links across all screen reading software.
**Action:** Adding `aria-hidden="true"` to all decorative arrows and ensuring robust `aria-label` attributes are added to all icon-only social/contact links to provide solid accessible names.
