import type { ReactNode } from 'react'

export interface OptionProps {
  value: string
  selected: boolean
  onSelect: (value: string) => void
  onMouseEnter: (value: string) => void
  parseOption?: (value: string) => ReactNode
  className?: string
  selectedClassName?: string
}

export function Option({
  value,
  selected,
  onSelect,
  onMouseEnter,
  parseOption,
  className,
  selectedClassName,
}: OptionProps) {
  const combinedClassName = [className, selected ? selectedClassName : '']
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <li
      role="option"
      aria-selected={selected}
      data-testid="option"
      className={combinedClassName}
      onClick={() => onSelect(value)}
      onMouseEnter={() => onMouseEnter(value)}
    >
      {parseOption ? parseOption(value) : value}
    </li>
  )
}
