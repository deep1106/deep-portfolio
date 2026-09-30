---
name: design-system-google-antigravity
description: >
  Apply the Google Antigravity design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for marketing interfaces.
---

# Google Antigravity — Design System Skill

## When to Use

- Building new UI components for Google Antigravity.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for marketing pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Google Antigravity — https://antigravity.google/
- **Surface:** marketing
- **Audience:** Business decision-makers and potential customers
- **Character:** Conversion-focused marketing presence with a rich, diverse color palette and 3 typefaces.

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| --theme-button-states-on-disabled | `#6A6A71` | Text Primary |
| color-1 | `#121317` | Text Primary |
| color-2 | `#45474D` | Text Primary |
| color-4 | `#B7BFD9` | Background Dark |
| color-5 | `#FFFFFF` | Text Light |

### Typography

**Font stack:** Google Sans Flex, Google Symbols, Times New Roman

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 15px | Captions, metadata |
| text-sm | 16px | Labels, secondary text |
| text-base | 18px | Body text (default) |
| text-lg | 20px | Subheadings, emphasis |
| text-xl | 22px | Section headings |
| text-2xl | 24px | Section headings |
| text-3xl | 72px | Section headings |
| text-4xl | 80px | Section headings |

**Weight scale:** 300 · 400 · 450
**Line heights:** 88px · 21.02px · 21.75px · 72.04px · 25.38px · 20px · 24px · 0px

### Spacing

**Base unit:** 8px

`space-1: 4px` · `space-2: 6px` · `space-3: 8px` · `space-4: 10px` · `space-5: 16px` · `space-6: 24px` · `space-7: 32px` · `space-8: 36px` · `space-9: 60px` · `space-10: 64px` · `space-11: 72px`

### Shapes

**Border radius:** `radius-sm: 36px` · `radius-full: 9999px`

### Elevation

_None detected._

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `0.15s ease-out`
- **duration-fast:** `transform 0.15s ease-out, opacity 0.15s ease-out`
- **duration-base:** `transform 0.3s ease-in-out, background-color 0.3s`
- **duration-base:** `transform 0.3s, opacity 0.3s`
- **duration-slow:** `0.5s infinite blink`

## Component Inventory

- **Buttons:** 14 detected
- **Links:** 77 detected
- **Navigation:** 8 elements
- **Lists:** 1 detected
- **Images:** 33 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 8px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (36px, 9999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
