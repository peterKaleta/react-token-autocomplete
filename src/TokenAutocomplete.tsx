import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Token } from './Token'
import { Options } from './Options'
import { useTokenAutocomplete } from './useTokenAutocomplete'

export interface TokenAutocompleteProps {
  options?: string[]
  defaultValues?: string[]
  placeholder?: string
  threshold?: number
  processing?: boolean
  autoFocus?: boolean
  filterOptions?: boolean
  simulateSelect?: boolean
  limitToOptions?: boolean
  parseOption?: (option: string) => ReactNode
  parseToken?: (token: string) => ReactNode
  parseCustom?: (value: string) => string
  onInputChange?: (value: string) => void
  onAdd?: (value: string) => void
  onRemove?: (value: string, index: number) => void
  className?: string
  inputClassName?: string
  tokenClassName?: string
  tokenRemoveClassName?: string
  optionsClassName?: string
  optionClassName?: string
  optionSelectedClassName?: string
  placeholderClassName?: string
  processingClassName?: string
}

export function TokenAutocomplete({
  options = [],
  defaultValues = [],
  placeholder = '',
  threshold = 0,
  processing = false,
  autoFocus = false,
  filterOptions = true,
  simulateSelect = false,
  limitToOptions = false,
  parseOption,
  parseToken,
  parseCustom,
  onInputChange,
  onAdd,
  onRemove,
  className,
  inputClassName,
  tokenClassName,
  tokenRemoveClassName,
  optionsClassName,
  optionClassName,
  optionSelectedClassName,
  placeholderClassName,
  processingClassName,
}: TokenAutocompleteProps) {
  const {
    values,
    inputValue,
    focused,
    selectedIndex,
    availableOptions,
    showOptions,
    showInput,
    setInputValue,
    removeValue,
    focus,
    handleKeyDown,
    handleOptionMouseEnter,
    handleOptionSelect,
    inputRef,
    containerRef,
  } = useTokenAutocomplete({
    options,
    defaultValues,
    threshold,
    filterOptions,
    simulateSelect,
    limitToOptions,
    parseCustom,
    onInputChange,
    onAdd,
    onRemove,
  })

  useEffect(() => {
    if (autoFocus) {
      focus()
    }
  }, [autoFocus, focus])

  const showPlaceholder = values.length === 0 && inputValue === '' && !focused

  return (
    <div
      ref={containerRef}
      data-testid="token-autocomplete"
      className={className}
      onClick={focus}
    >
      {values.map((value, index) => (
        <Token
          key={`${value}-${index}`}
          value={value}
          onRemove={() => removeValue(index)}
          parseToken={parseToken}
          className={tokenClassName}
          removeClassName={tokenRemoveClassName}
        />
      ))}

      {showInput && (
        <input
          ref={inputRef}
          type="text"
          data-testid="token-input"
          className={inputClassName}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={focus}
          onKeyDown={handleKeyDown}
        />
      )}

      {showPlaceholder && placeholder && (
        <span data-testid="placeholder" className={placeholderClassName}>
          {placeholder}
        </span>
      )}

      {processing && (
        <span data-testid="processing" className={processingClassName} aria-label="Loading" />
      )}

      {showOptions && (
        <Options
          options={availableOptions}
          selectedIndex={selectedIndex}
          onSelect={handleOptionSelect}
          onMouseEnter={handleOptionMouseEnter}
          parseOption={parseOption}
          className={optionsClassName}
          optionClassName={optionClassName}
          optionSelectedClassName={optionSelectedClassName}
        />
      )}
    </div>
  )
}
