import type { ReactNode } from 'react'

export interface TokenProps {
  value: string
  onRemove: () => void
  parseToken?: (value: string) => ReactNode
  className?: string
  removeClassName?: string
  fullWidth?: boolean
}

export function Token({
  value,
  onRemove,
  parseToken,
  className,
  removeClassName,
}: TokenProps) {
  return (
    <span data-testid="token" className={className}>
      {parseToken ? parseToken(value) : value}
      <button
        type="button"
        data-testid="token-remove"
        className={removeClassName}
        onClick={onRemove}
        aria-label={`Remove ${value}`}
      >
        &times;
      </button>
    </span>
  )
}
