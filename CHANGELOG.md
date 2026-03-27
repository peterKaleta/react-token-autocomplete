# Changelog

## 1.0.0

### Breaking Changes

- **React 18+/19 required** — dropped support for React 0.13
- **All components are now functional** — class components removed
- **Style-agnostic** — Radium CSS-in-JS removed; all styling via `className` props
- **No default styles** — you must provide your own classes (Tailwind, CSS modules, etc.)
- **Immutable.js removed** — values are plain `string[]` arrays
- **Props renamed:**
  - `treshold` → `threshold` (typo fixed)
  - `focus` → `autoFocus`
- **Exports changed:**
  - Default export replaced with named exports: `TokenAutocomplete`, `Token`, `Options`, `Option`
  - New headless hook: `useTokenAutocomplete`
  - All TypeScript types exported

### Added

- TypeScript support with full type declarations
- `useTokenAutocomplete` headless hook for custom rendering
- `className` props on every element (`className`, `inputClassName`, `tokenClassName`, `tokenRemoveClassName`, `optionsClassName`, `optionClassName`, `optionSelectedClassName`, `placeholderClassName`, `processingClassName`)
- ARIA roles (`listbox`, `option`, `aria-selected`, `aria-label`)
- ESM + CJS dual package output
- Case-insensitive option filtering

### Removed

- Radium dependency
- Immutable.js dependency
- lodash dependency
- underscore.string dependency
- All inline styles
- Webpack build (replaced with Vite)
- Karma/Mocha/Chai tests (replaced with Vitest + React Testing Library)
- Examples directory (will be replaced with Storybook or similar)
