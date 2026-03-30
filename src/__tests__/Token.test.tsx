import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Token } from '../Token'

describe('Token', () => {
  it('renders the value', () => {
    render(<Token value="hello" onRemove={() => {}} />)
    expect(screen.getByTestId('token')).toHaveTextContent('hello')
  })

  it('renders with parseToken', () => {
    render(
      <Token
        value="hello"
        onRemove={() => {}}
        parseToken={(v) => <strong>{v.toUpperCase()}</strong>}
      />,
    )
    expect(screen.getByTestId('token')).toHaveTextContent('HELLO')
  })

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Token value="hello" onRemove={onRemove} />)
    await user.click(screen.getByTestId('token-remove'))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('applies className props', () => {
    render(
      <Token
        value="hello"
        onRemove={() => {}}
        className="token-class"
        removeClassName="remove-class"
      />,
    )
    expect(screen.getByTestId('token')).toHaveClass('token-class')
    expect(screen.getByTestId('token-remove')).toHaveClass('remove-class')
  })

  it('has accessible remove button label', () => {
    render(<Token value="hello" onRemove={() => {}} />)
    expect(screen.getByLabelText('Remove hello')).toBeInTheDocument()
  })
})
