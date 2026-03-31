import type { ReactNode } from 'react'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { Token } from './Token'
import { Options } from './Options'
import { useTokenAutocomplete } from './useTokenAutocomplete'

export interface TokenAutocompleteProps {
  /** Controlled value — makes the component controlled. */
  value?: string[]
  /** Called with the full values array on every add/remove (controlled mode). */
  onChange?: (values: string[]) => void
  options?: string[]
  /** Initial values for uncontrolled mode. Ignored when `value` is provided. */
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
  /** Separator for splitting pasted text into multiple tokens. Defaults to comma. Set to false to disable. */
  pasteSeparator?: string | false
  className?: string
  inputClassName?: string
  tokenClassName?: string
  tokenRemoveClassName?: string
  optionsClassName?: string
  optionClassName?: string
  optionSelectedClassName?: string
  placeholderClassName?: string
  processingClassName?: string
  ariaLabel?: string
}

export const TokenAutocomplete = forwardRef<
  HTMLInputElement,
  TokenAutocompleteProps
>(function TokenAutocomplete(
  {
    value,
    onChange,
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
    pasteSeparator,
    className,
    inputClassName,
    tokenClassName,
    tokenRemoveClassName,
    optionsClassName,
    optionClassName,
    optionSelectedClassName,
    placeholderClassName,
    processingClassName,
    ariaLabel,
  },
  ref,
) {
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
    handlePaste,
    handleOptionMouseEnter,
    handleOptionSelect,
    inputRef,
    containerRef,
  } = useTokenAutocomplete({
    value,
    onChange,
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
    pasteSeparator,
  })

  // Forward ref to the internal input for react-hook-form focus management
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [inputRef])

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
          onPaste={handlePaste}
          aria-label={ariaLabel || placeholder || 'Token input'}
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
})
