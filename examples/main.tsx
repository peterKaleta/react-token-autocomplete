import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { TokenAutocomplete } from '../src'

const FRAMEWORKS = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Preact', 'Lit', 'Ember', 'Alpine', 'Qwik']
const COLORS = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet', 'Pink', 'Teal', 'Cyan']

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {children}
    </div>
  )
}

function BasicExample() {
  const [log, setLog] = useState<string[]>([])
  return (
    <Section title="Basic" description="Multi-token input with autocomplete suggestions.">
      <TokenAutocomplete
        options={FRAMEWORKS}
        placeholder="Add a framework..."
        onAdd={(v) => setLog((l) => [...l, `+ ${v}`])}
        onRemove={(v) => setLog((l) => [...l, `- ${v}`])}
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-blue-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-blue-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
      {log.length > 0 && (
        <div className="mt-3 text-xs text-gray-400 font-mono">
          {log.slice(-5).map((entry, i) => <div key={i}>{entry}</div>)}
        </div>
      )}
    </Section>
  )
}

function ThresholdExample() {
  return (
    <Section title="Threshold" description="Suggestions appear after typing 3+ characters.">
      <TokenAutocomplete
        options={FRAMEWORKS}
        threshold={3}
        placeholder="Type at least 3 characters..."
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-purple-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-purple-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-purple-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </Section>
  )
}

function LimitToOptionsExample() {
  return (
    <Section title="Limit to Options" description="Only predefined options can be selected — no custom values.">
      <TokenAutocomplete
        options={COLORS}
        limitToOptions
        placeholder="Pick colors..."
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-emerald-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-emerald-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-emerald-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </Section>
  )
}

function SimulateSelectExample() {
  return (
    <Section title="Simulate Select" description="Acts like a single-value select dropdown.">
      <TokenAutocomplete
        options={FRAMEWORKS}
        simulateSelect
        placeholder="Choose one..."
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-amber-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-amber-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-amber-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </Section>
  )
}

function ProcessingExample() {
  const [processing, setProcessing] = useState(false)
  return (
    <Section title="Processing" description="Shows a loading spinner while fetching options.">
      <div className="flex items-center gap-3 mb-3">
        <button
          className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
          onClick={() => setProcessing((p) => !p)}
        >
          Toggle processing: {processing ? 'ON' : 'OFF'}
        </button>
      </div>
      <TokenAutocomplete
        options={FRAMEWORKS}
        processing={processing}
        placeholder="Add a framework..."
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-rose-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-rose-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-rose-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
        processingClassName="animate-spin h-4 w-4 border-2 border-rose-500 border-t-transparent rounded-full"
      />
    </Section>
  )
}

function ParseExample() {
  return (
    <Section title="Custom Rendering" description="Custom parseToken and parseOption for rich display.">
      <TokenAutocomplete
        options={COLORS}
        parseToken={(v) => (
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ background: v.toLowerCase() }} />
            {v}
          </span>
        )}
        parseOption={(v) => (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: v.toLowerCase() }} />
            {v}
          </span>
        )}
        placeholder="Pick colors..."
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-sky-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-sky-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-sky-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </Section>
  )
}

function ControlledExample() {
  const [values, setValues] = useState<string[]>(['React'])
  return (
    <Section title="Controlled" description="Controlled mode with value + onChange, ready for react-hook-form.">
      <TokenAutocomplete
        options={FRAMEWORKS}
        value={values}
        onChange={setValues}
        placeholder="Add a framework..."
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-teal-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-teal-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-teal-50"
        placeholderClassName="text-gray-500 text-sm absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
      <div className="mt-3 text-xs text-gray-500 font-mono">
        state: {JSON.stringify(values)}
      </div>
    </Section>
  )
}

function DefaultValuesExample() {
  return (
    <Section title="Default Values" description="Pre-populated with initial tokens.">
      <TokenAutocomplete
        options={FRAMEWORKS}
        defaultValues={['React', 'Vue']}
        ariaLabel="Add a framework"
        className="flex flex-wrap items-center gap-1 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500 bg-white min-h-[42px] relative"
        inputClassName="outline-none flex-1 min-w-[120px] bg-transparent text-sm"
        tokenClassName="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-sm"
        tokenRemoveClassName="hover:text-red-600 cursor-pointer text-indigo-400 ml-0.5"
        optionsClassName="absolute z-10 left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm"
        optionSelectedClassName="bg-indigo-50"
      />
    </Section>
  )
}

function App() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">react-token-autocomplete</h1>
        <p className="text-gray-600 mt-1">Style-agnostic token input for React. All examples styled with Tailwind.</p>
      </header>

      <BasicExample />
      <ControlledExample />
      <DefaultValuesExample />
      <ThresholdExample />
      <LimitToOptionsExample />
      <SimulateSelectExample />
      <ProcessingExample />
      <ParseExample />

      <footer className="text-center text-xs text-gray-600 py-4">
        <p>Keyboard: <kbd className="px-1 py-0.5 border rounded text-gray-600">Enter</kbd> to add, <kbd className="px-1 py-0.5 border rounded text-gray-600">Backspace</kbd> to remove, <kbd className="px-1 py-0.5 border rounded text-gray-600">Esc</kbd> to close, <kbd className="px-1 py-0.5 border rounded text-gray-600">↑↓</kbd> to navigate</p>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
