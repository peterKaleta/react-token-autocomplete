import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Options } from '../Options'

describe('Options', () => {
  const defaultProps = {
    options: ['one', 'two', 'three'],
    selectedIndex: 0,
    onSelect: vi.fn(),
    onMouseEnter: vi.fn(),
  }

  it('renders all options', () => {
    render(<Options {...defaultProps} />)
    expect(screen.getAllByTestId('option')).toHaveLength(3)
  })

  it('renders nothing when options is empty', () => {
    render(<Options {...defaultProps} options={[]} />)
    expect(screen.queryByTestId('options')).not.toBeInTheDocument()
  })

  it('marks the correct option as selected', () => {
    render(<Options {...defaultProps} selectedIndex={1} />)
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveAttribute('aria-selected', 'false')
    expect(options[1]).toHaveAttribute('aria-selected', 'true')
    expect(options[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('applies className props', () => {
    render(
      <Options
        {...defaultProps}
        className="list-class"
        optionClassName="opt-class"
        optionSelectedClassName="sel-class"
      />,
    )
    expect(screen.getByTestId('options')).toHaveClass('list-class')
    const opts = screen.getAllByTestId('option')
    expect(opts[0]).toHaveClass('opt-class')
    expect(opts[0]).toHaveClass('sel-class')
    expect(opts[1]).toHaveClass('opt-class')
    expect(opts[1]).not.toHaveClass('sel-class')
  })

  it('has role=listbox', () => {
    render(<Options {...defaultProps} />)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })
})
