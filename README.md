# react-token-autocomplete

A style-agnostic token/tag autocomplete component for React. Ships with zero default styles — bring your own CSS, Tailwind, CSS modules, or any styling solution.

## Install

```
npm install react-token-autocomplete
```

Requires React 18 or 19 as a peer dependency.

## Quick Start

```tsx
import { TokenAutocomplete } from 'react-token-autocomplete'

function App() {
  return (
    <TokenAutocomplete
      options={['React', 'Vue', 'Svelte', 'Angular', 'Solid']}
      placeholder="Add a framework..."
      onAdd={(value) => console.log('Added:', value)}
      onRemove={(value) => console.log('Removed:', value)}
    />
  )
}
```

## Styling with Tailwind

Every element exposes a `className` prop — no style overrides or CSS specificity battles:

```tsx
<TokenAutocomplete
  options={['React', 'Vue', 'Svelte']}
  className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500"
  inputClassName="outline-none flex-1 min-w-[120px] bg-transparent"
  tokenClassName="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-sm"
  tokenRemoveClassName="hover:text-red-600 cursor-pointer text-blue-400"
  optionsClassName="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
  optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50"
  optionSelectedClassName="bg-blue-50"
  placeholderClassName="text-gray-400"
  processingClassName="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[]` | `[]` | Available options to select from |
| `defaultValues` | `string[]` | `[]` | Initial selected tokens |
| `placeholder` | `string` | `''` | Placeholder text when empty |
| `threshold` | `number` | `0` | Min characters before showing suggestions |
| `processing` | `boolean` | `false` | Show a loading indicator |
| `autoFocus` | `boolean` | `false` | Focus input on mount |
| `filterOptions` | `boolean` | `true` | Filter options by input text |
| `simulateSelect` | `boolean` | `false` | Single-value select mode (hides input after selection) |
| `limitToOptions` | `boolean` | `false` | Only allow values from options (no custom input) |
| `parseOption` | `(option: string) => ReactNode` | — | Custom render for dropdown options |
| `parseToken` | `(token: string) => ReactNode` | — | Custom render for tokens |
| `parseCustom` | `(value: string) => string` | — | Transform custom input values |
| `onInputChange` | `(value: string) => void` | — | Called when input text changes |
| `onAdd` | `(value: string) => void` | — | Called when a token is added |
| `onRemove` | `(value: string, index: number) => void` | — | Called when a token is removed |

### className Props

| Prop | Element |
|------|---------|
| `className` | Outer container `<div>` |
| `inputClassName` | Text `<input>` |
| `tokenClassName` | Token `<span>` |
| `tokenRemoveClassName` | Token remove `<button>` |
| `optionsClassName` | Dropdown `<ul>` |
| `optionClassName` | Each option `<li>` |
| `optionSelectedClassName` | Currently highlighted option (added alongside `optionClassName`) |
| `placeholderClassName` | Placeholder `<span>` |
| `processingClassName` | Loading indicator `<span>` |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Add the currently highlighted option |
| `Escape` | Close the dropdown |
| `Backspace` | Remove last token (when input is empty) |
| `ArrowUp` / `ArrowDown` | Navigate options |

## Headless Hook

For full control over rendering, use the `useTokenAutocomplete` hook:

```tsx
import { useTokenAutocomplete } from 'react-token-autocomplete'

function CustomAutocomplete() {
  const {
    values,
    inputValue,
    availableOptions,
    showOptions,
    setInputValue,
    addValue,
    removeValue,
    handleKeyDown,
    handleOptionMouseEnter,
    handleOptionSelect,
    inputRef,
    containerRef,
    focus,
    selectedIndex,
  } = useTokenAutocomplete({
    options: ['React', 'Vue', 'Svelte'],
    onAdd: (v) => console.log('added', v),
  })

  return (
    <div ref={containerRef} onClick={focus}>
      {values.map((v, i) => (
        <span key={i}>
          {v}
          <button onClick={() => removeValue(i)}>&times;</button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={focus}
      />
      {showOptions && (
        <ul>
          {availableOptions.map((opt, i) => (
            <li
              key={opt}
              onClick={() => handleOptionSelect(opt)}
              onMouseEnter={() => handleOptionMouseEnter(opt)}
              style={{ background: i === selectedIndex ? '#eee' : undefined }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

## Exports

```ts
// Components
import { TokenAutocomplete, Token, Options, Option } from 'react-token-autocomplete'

// Headless hook
import { useTokenAutocomplete } from 'react-token-autocomplete'

// Types
import type {
  TokenAutocompleteProps,
  TokenProps,
  OptionsProps,
  OptionProps,
  UseTokenAutocompleteOptions,
  UseTokenAutocompleteReturn,
} from 'react-token-autocomplete'
```

## Development

```bash
npm install        # install dependencies
npm run build      # build library (ESM + CJS + types)
npm test           # run tests
npm run test:watch # run tests in watch mode
npm run lint       # type-check with tsc
```

## License

ISC
