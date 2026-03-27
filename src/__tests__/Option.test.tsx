import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Option } from '../Option'

describe('Option', () => {
  const defaultProps = {
    value: 'option1',
    selected: false,
    onSelect: vi.fn(),
    onMouseEnter: vi.fn(),
  }

  it('renders the value', () => {
    render(<Option {...defaultProps} />)
    expect(screen.getByTestId('option')).toHaveTextContent('option1')
  })

  it('renders with parseOption', () => {
    render(
      <Option
        {...defaultProps}
        parseOption={(v) => <em>{v}</em>}
      />,
    )
    expect(screen.getByTestId('option').querySelector('em')).toHaveTextContent('option1')
  })

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Option {...defaultProps} onSelect={onSelect} />)
    await user.click(screen.getByTestId('option'))
    expect(onSelect).toHaveBeenCalledWith('option1')
  })

  it('calls onMouseEnter on hover', async () => {
    const user = userEvent.setup()
    const onMouseEnter = vi.fn()
    render(<Option {...defaultProps} onMouseEnter={onMouseEnter} />)
    await user.hover(screen.getByTestId('option'))
    expect(onMouseEnter).toHaveBeenCalledWith('option1')
  })

  it('applies selected className when selected', () => {
    render(
      <Option
        {...defaultProps}
        selected={true}
        className="opt"
        selectedClassName="selected"
      />,
    )
    const el = screen.getByTestId('option')
    expect(el).toHaveClass('opt')
    expect(el).toHaveClass('selected')
  })

  it('does not apply selected className when not selected', () => {
    render(
      <Option
        {...defaultProps}
        selected={false}
        className="opt"
        selectedClassName="selected"
      />,
    )
    const el = screen.getByTestId('option')
    expect(el).toHaveClass('opt')
    expect(el).not.toHaveClass('selected')
  })

  it('has role=option and correct aria-selected', () => {
    render(<Option {...defaultProps} selected={true} />)
    const el = screen.getByRole('option')
    expect(el).toHaveAttribute('aria-selected', 'true')
  })
})
