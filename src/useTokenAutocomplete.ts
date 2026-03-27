import { useState, useCallback, useRef, useEffect } from 'react'

export interface UseTokenAutocompleteOptions {
  options?: string[]
  defaultValues?: string[]
  threshold?: number
  filterOptions?: boolean
  simulateSelect?: boolean
  limitToOptions?: boolean
  parseCustom?: (value: string) => string
  onInputChange?: (value: string) => void
  onAdd?: (value: string) => void
  onRemove?: (value: string, index: number) => void
}

export interface UseTokenAutocompleteReturn {
  values: string[]
  inputValue: string
  focused: boolean
  selectedIndex: number
  availableOptions: string[]
  showOptions: boolean
  showInput: boolean
  setInputValue: (value: string) => void
  addValue: (value: string) => void
  removeValue: (index: number) => void
  focus: () => void
  blur: () => void
  handleKeyDown: (e: React.KeyboardEvent) => void
  handleOptionMouseEnter: (value: string) => void
  handleOptionSelect: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function useTokenAutocomplete({
  options = [],
  defaultValues = [],
  threshold = 0,
  filterOptions = true,
  simulateSelect = false,
  limitToOptions = false,
  parseCustom,
  onInputChange,
  onAdd,
  onRemove,
}: UseTokenAutocompleteOptions = {}): UseTokenAutocompleteReturn {
  const [values, setValues] = useState<string[]>(defaultValues)
  const [inputValue, setInputValueState] = useState('')
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const getAvailableOptions = useCallback(() => {
    let available = options.filter((opt) => !values.includes(opt))

    if (filterOptions && inputValue) {
      available = available.filter((opt) =>
        opt.toLowerCase().includes(inputValue.toLowerCase()),
      )
    }

    if (inputValue && !limitToOptions) {
      const customValue = parseCustom ? parseCustom(inputValue) : inputValue
      if (!available.includes(customValue) && !values.includes(customValue)) {
        available = [customValue, ...available]
      }
    }

    return available
  }, [options, values, inputValue, filterOptions, limitToOptions, parseCustom])

  const availableOptions = getAvailableOptions()

  const showOptions =
    focused && inputValue.length >= threshold && availableOptions.length > 0

  const showInput = !simulateSelect || values.length === 0

  const setInputValue = useCallback(
    (value: string) => {
      setInputValueState(value)
      setSelectedIndex(0)
      onInputChange?.(value)
    },
    [onInputChange],
  )

  const addValue = useCallback(
    (value: string) => {
      if (!value || values.includes(value)) return

      if (simulateSelect) {
        setValues([value])
      } else {
        setValues((prev) => [...prev, value])
      }
      setInputValueState('')
      setSelectedIndex(0)
      onAdd?.(value)
    },
    [values, simulateSelect, onAdd],
  )

  const removeValue = useCallback(
    (index: number) => {
      const removed = values[index]
      if (removed === undefined) return
      setValues((prev) => prev.filter((_, i) => i !== index))
      onRemove?.(removed, index)
    },
    [values, onRemove],
  )

  const addSelectedValue = useCallback(() => {
    const opts = getAvailableOptions()
    const value = opts[selectedIndex]
    if (value !== undefined) {
      addValue(value)
    }
  }, [getAvailableOptions, selectedIndex, addValue])

  const focus = useCallback(() => {
    setFocused(true)
    inputRef.current?.focus()
  }, [])

  const blur = useCallback(() => {
    setFocused(false)
    setSelectedIndex(0)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter': {
          e.preventDefault()
          addSelectedValue()
          break
        }
        case 'Escape': {
          blur()
          inputRef.current?.blur()
          break
        }
        case 'Backspace': {
          if (inputValue === '' && values.length > 0) {
            removeValue(values.length - 1)
          }
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          const opts = getAvailableOptions()
          setSelectedIndex((prev) =>
            prev < opts.length - 1 ? prev + 1 : prev,
          )
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
          break
        }
      }
    },
    [addSelectedValue, blur, inputValue, values.length, removeValue, getAvailableOptions],
  )

  const handleOptionMouseEnter = useCallback(
    (value: string) => {
      const opts = getAvailableOptions()
      const index = opts.indexOf(value)
      if (index >= 0) {
        setSelectedIndex(index)
      }
    },
    [getAvailableOptions],
  )

  const handleOptionSelect = useCallback(
    (value: string) => {
      addValue(value)
    },
    [addValue],
  )

  // Click outside to blur
  useEffect(() => {
    if (!focused) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        blur()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [focused, blur])

  return {
    values,
    inputValue,
    focused,
    selectedIndex,
    availableOptions,
    showOptions,
    showInput,
    setInputValue,
    addValue,
    removeValue,
    focus,
    blur,
    handleKeyDown,
    handleOptionMouseEnter,
    handleOptionSelect,
    inputRef,
    containerRef,
  }
}
