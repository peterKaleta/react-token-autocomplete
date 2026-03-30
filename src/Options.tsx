import type { ReactNode } from 'react'
import { Option } from './Option'

export interface OptionsProps {
  options: string[]
  selectedIndex: number
  onSelect: (value: string) => void
  onMouseEnter: (value: string) => void
  parseOption?: (value: string) => ReactNode
  className?: string
  optionClassName?: string
  optionSelectedClassName?: string
  ariaLabel?: string
}

export function Options({
  options,
  selectedIndex,
  onSelect,
  onMouseEnter,
  parseOption,
  className,
  optionClassName,
  optionSelectedClassName,
  ariaLabel = 'Suggestions',
}: OptionsProps) {
  if (options.length === 0) return null

  return (
    <ul role="listbox" aria-label={ariaLabel} data-testid="options" className={className}>
      {options.map((option, index) => (
        <Option
          key={option}
          value={option}
          selected={index === selectedIndex}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
          parseOption={parseOption}
          className={optionClassName}
          selectedClassName={optionSelectedClassName}
        />
      ))}
    </ul>
  )
}
