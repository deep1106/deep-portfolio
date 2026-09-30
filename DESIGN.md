# Google Antigravity

## Overview

**Product:** Google Antigravity
**URL:** https://antigravity.google/
**Surface type:** marketing
**Audience:** Business decision-makers and potential customers
**Brand character:** Conversion-focused marketing presence with a rich, diverse color palette and 3 typefaces.

### Design Principles

- Consistency over novelty — reuse existing patterns before inventing new ones.
- Token-driven — every visual decision references a token, not a magic number.
- Accessible by default — compliance is a baseline, not a feature.

## Colors

| Token | Value | Role |
|-------|-------|------|
| --theme-button-states-on-disabled | `#6A6A71` | Text Primary |
| color-1 | `#121317` | Text Primary |
| color-2 | `#45474D` | Text Primary |
| color-4 | `#B7BFD9` | Background Dark |
| color-5 | `#FFFFFF` | Text Light |

## Typography

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

## Spacing

**Base unit:** 8px

`space-1: 4px` · `space-2: 6px` · `space-3: 8px` · `space-4: 10px` · `space-5: 16px` · `space-6: 24px` · `space-7: 32px` · `space-8: 36px` · `space-9: 60px` · `space-10: 64px` · `space-11: 72px`

## Shapes

**Border radius:** `radius-sm: 36px` · `radius-full: 9999px`

## Elevation

_None detected._

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `0.15s ease-out`
- **duration-fast:** `transform 0.15s ease-out, opacity 0.15s ease-out`
- **duration-base:** `transform 0.3s ease-in-out, background-color 0.3s`
- **duration-base:** `transform 0.3s, opacity 0.3s`
- **duration-slow:** `0.5s infinite blink`

## Components

- **Buttons:** 14 detected
- **Links:** 77 detected
- **Navigation:** 8 elements
- **Lists:** 1 detected
- **Images:** 33 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (36px, 9999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 14 detected
- **Links:** 77 detected
- **Navigation:** 8 elements
- **Lists:** 1 detected
- **Images:** 33 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
