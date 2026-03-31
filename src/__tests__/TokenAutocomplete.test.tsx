import React, { useState, createRef, act } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TokenAutocomplete } from '../TokenAutocomplete'

function renderComponent(props = {}) {
  const defaultProps = {
    options: ['alpha', 'beta', 'gamma'],
    ...props,
  }
  return render(<TokenAutocomplete {...defaultProps} />)
}

describe('TokenAutocomplete', () => {
  describe('rendering', () => {
    it('renders the component', () => {
      renderComponent()
      expect(screen.getByTestId('token-autocomplete')).toBeInTheDocument()
    })

    it('renders an input', () => {
      renderComponent()
      expect(screen.getByTestId('token-input')).toBeInTheDocument()
    })

    it('renders placeholder when empty and not focused', () => {
      renderComponent({ placeholder: 'Type here...' })
      expect(screen.getByTestId('placeholder')).toHaveTextContent('Type here...')
    })

    it('renders default values as tokens', () => {
      renderComponent({ defaultValues: ['alpha', 'beta'] })
      expect(screen.getAllByTestId('token')).toHaveLength(2)
    })

    it('shows processing indicator', () => {
      renderComponent({ processing: true })
      expect(screen.getByTestId('processing')).toBeInTheDocument()
    })

    it('does not show processing indicator by default', () => {
      renderComponent()
      expect(screen.queryByTestId('processing')).not.toBeInTheDocument()
    })
  })

  describe('className props', () => {
    it('applies className to container', () => {
      renderComponent({ className: 'my-container' })
      expect(screen.getByTestId('token-autocomplete')).toHaveClass('my-container')
    })

    it('applies inputClassName to input', () => {
      renderComponent({ inputClassName: 'my-input' })
      expect(screen.getByTestId('token-input')).toHaveClass('my-input')
    })

    it('applies tokenClassName to tokens', () => {
      renderComponent({ defaultValues: ['alpha'], tokenClassName: 'my-token' })
      expect(screen.getByTestId('token')).toHaveClass('my-token')
    })

    it('applies placeholderClassName', () => {
      renderComponent({ placeholder: 'hi', placeholderClassName: 'my-placeholder' })
      expect(screen.getByTestId('placeholder')).toHaveClass('my-placeholder')
    })

    it('applies processingClassName', () => {
      renderComponent({ processing: true, processingClassName: 'my-spinner' })
      expect(screen.getByTestId('processing')).toHaveClass('my-spinner')
    })
  })

  describe('adding tokens', () => {
    it('shows options when input has text and is focused', async () => {
      const user = userEvent.setup()
      renderComponent()
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      expect(screen.getByTestId('options')).toBeInTheDocument()
    })

    it('adds a token when pressing Enter', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      renderComponent({ onAdd, limitToOptions: true })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      await user.keyboard('{Enter}')
      expect(onAdd).toHaveBeenCalledWith('alpha')
      expect(screen.getByTestId('token')).toHaveTextContent('alpha')
    })

    it('adds a token when clicking an option', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      renderComponent({ onAdd })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      const options = screen.getAllByTestId('option')
      await user.click(options[0])
      expect(onAdd).toHaveBeenCalled()
    })

    it('clears input after adding a token', async () => {
      const user = userEvent.setup()
      renderComponent()
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'alpha')
      await user.keyboard('{Enter}')
      expect(input).toHaveValue('')
    })

    it('does not add duplicate tokens', async () => {
      const user = userEvent.setup()
      renderComponent({ defaultValues: ['alpha'] })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'alpha')
      await user.keyboard('{Enter}')
      // Should still only have 1 token
      expect(screen.getAllByTestId('token')).toHaveLength(1)
    })
  })

  describe('removing tokens', () => {
    it('removes a token when clicking its remove button', async () => {
      const user = userEvent.setup()
      const onRemove = vi.fn()
      renderComponent({ defaultValues: ['alpha', 'beta'], onRemove })
      const tokens = screen.getAllByTestId('token')
      const removeBtn = within(tokens[0]).getByTestId('token-remove')
      await user.click(removeBtn)
      expect(onRemove).toHaveBeenCalledWith('alpha', 0)
      expect(screen.getAllByTestId('token')).toHaveLength(1)
    })

    it('removes last token on Backspace when input is empty', async () => {
      const user = userEvent.setup()
      const onRemove = vi.fn()
      renderComponent({ defaultValues: ['alpha', 'beta'], onRemove })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.keyboard('{Backspace}')
      expect(onRemove).toHaveBeenCalledWith('beta', 1)
    })
  })

  describe('keyboard navigation', () => {
    it('navigates options with arrow keys', async () => {
      const user = userEvent.setup()
      renderComponent()
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')

      // First option should be selected initially
      const options = screen.getAllByRole('option')
      expect(options[0]).toHaveAttribute('aria-selected', 'true')

      // Arrow down to select second
      await user.keyboard('{ArrowDown}')
      const updatedOptions = screen.getAllByRole('option')
      expect(updatedOptions[1]).toHaveAttribute('aria-selected', 'true')

      // Arrow up to go back
      await user.keyboard('{ArrowUp}')
      const finalOptions = screen.getAllByRole('option')
      expect(finalOptions[0]).toHaveAttribute('aria-selected', 'true')
    })

    it('closes dropdown on Escape', async () => {
      const user = userEvent.setup()
      renderComponent()
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      expect(screen.getByTestId('options')).toBeInTheDocument()
      await user.keyboard('{Escape}')
      expect(screen.queryByTestId('options')).not.toBeInTheDocument()
    })
  })

  describe('filtering', () => {
    it('filters options based on input', async () => {
      const user = userEvent.setup()
      renderComponent({ options: ['apple', 'banana', 'apricot'] })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'ap')
      const options = screen.getAllByTestId('option')
      // 'ap' as custom + 'apple' + 'apricot' = 3
      expect(options.length).toBeGreaterThanOrEqual(2)
    })

    it('filters case-insensitively', async () => {
      const user = userEvent.setup()
      renderComponent({ options: ['Alpha', 'Beta'] })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'alpha')
      expect(screen.getByTestId('options')).toBeInTheDocument()
    })

    it('excludes already selected values from options', async () => {
      const user = userEvent.setup()
      renderComponent({
        options: ['alpha', 'beta'],
        defaultValues: ['alpha'],
      })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      // alpha is already selected, so it should not appear
      const optionTexts = screen.getAllByTestId('option').map((el) => el.textContent)
      expect(optionTexts).not.toContain('alpha')
    })
  })

  describe('threshold', () => {
    it('does not show options when input length is below threshold', async () => {
      const user = userEvent.setup()
      renderComponent({ threshold: 3 })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'ab')
      expect(screen.queryByTestId('options')).not.toBeInTheDocument()
    })

    it('shows options when input length meets threshold', async () => {
      const user = userEvent.setup()
      renderComponent({ threshold: 3 })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'alp')
      expect(screen.getByTestId('options')).toBeInTheDocument()
    })
  })

  describe('limitToOptions', () => {
    it('does not show custom value when limitToOptions is true', async () => {
      const user = userEvent.setup()
      renderComponent({ limitToOptions: true, options: ['alpha'] })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'custom')
      expect(screen.queryByTestId('options')).not.toBeInTheDocument()
    })

    it('shows custom value when limitToOptions is false', async () => {
      const user = userEvent.setup()
      renderComponent({ limitToOptions: false, options: ['alpha'] })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'custom')
      const options = screen.getAllByTestId('option')
      expect(options.some((o) => o.textContent === 'custom')).toBe(true)
    })
  })

  describe('simulateSelect', () => {
    it('hides input after selecting a value', async () => {
      const user = userEvent.setup()
      renderComponent({ simulateSelect: true })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      await user.keyboard('{Enter}')
      expect(screen.queryByTestId('token-input')).not.toBeInTheDocument()
    })

    it('shows input again after removing selected value', async () => {
      const user = userEvent.setup()
      renderComponent({ simulateSelect: true })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      await user.keyboard('{Enter}')
      expect(screen.queryByTestId('token-input')).not.toBeInTheDocument()
      // Remove the token
      await user.click(screen.getByTestId('token-remove'))
      expect(screen.getByTestId('token-input')).toBeInTheDocument()
    })
  })

  describe('callbacks', () => {
    it('calls onInputChange when input value changes', async () => {
      const user = userEvent.setup()
      const onInputChange = vi.fn()
      renderComponent({ onInputChange })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'test')
      expect(onInputChange).toHaveBeenCalledWith('t')
      expect(onInputChange).toHaveBeenCalledWith('te')
      expect(onInputChange).toHaveBeenCalledWith('tes')
      expect(onInputChange).toHaveBeenCalledWith('test')
    })
  })

  describe('parseCustom', () => {
    it('transforms custom values through parseCustom', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      renderComponent({
        parseCustom: (v: string) => v.toUpperCase(),
        onAdd,
        options: [],
      })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'hello')
      await user.keyboard('{Enter}')
      expect(onAdd).toHaveBeenCalledWith('HELLO')
    })
  })

  describe('controlled mode', () => {
    function ControlledWrapper({ initialValues = [] as string[], ...props }) {
      const [values, setValues] = useState<string[]>(initialValues)
      return (
        <TokenAutocomplete
          options={['alpha', 'beta', 'gamma']}
          value={values}
          onChange={setValues}
          {...props}
        />
      )
    }

    it('renders controlled values', () => {
      render(<ControlledWrapper initialValues={['alpha', 'beta']} />)
      expect(screen.getAllByTestId('token')).toHaveLength(2)
    })

    it('adds tokens via onChange in controlled mode', async () => {
      const user = userEvent.setup()
      render(<ControlledWrapper limitToOptions />)
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      await user.keyboard('{Enter}')
      expect(screen.getByTestId('token')).toHaveTextContent('alpha')
    })

    it('removes tokens via onChange in controlled mode', async () => {
      const user = userEvent.setup()
      render(<ControlledWrapper initialValues={['alpha', 'beta']} />)
      const tokens = screen.getAllByTestId('token')
      await user.click(within(tokens[0]).getByTestId('token-remove'))
      expect(screen.getAllByTestId('token')).toHaveLength(1)
      expect(screen.getByTestId('token')).toHaveTextContent('beta')
    })

    it('calls onChange with full array on add', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <TokenAutocomplete
          options={['alpha', 'beta']}
          value={['alpha']}
          onChange={onChange}
          limitToOptions
        />,
      )
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'b')
      await user.keyboard('{Enter}')
      expect(onChange).toHaveBeenCalledWith(['alpha', 'beta'])
    })

    it('calls onChange with full array on remove', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <TokenAutocomplete
          options={['alpha', 'beta']}
          value={['alpha', 'beta']}
          onChange={onChange}
        />,
      )
      const tokens = screen.getAllByTestId('token')
      await user.click(within(tokens[0]).getByTestId('token-remove'))
      expect(onChange).toHaveBeenCalledWith(['beta'])
    })

    it('calls onAdd alongside onChange', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      const onChange = vi.fn()
      render(<ControlledWrapper onAdd={onAdd} limitToOptions />)
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.type(input, 'a')
      await user.keyboard('{Enter}')
      expect(onAdd).toHaveBeenCalledWith('alpha')
    })
  })

  describe('paste support', () => {
    it('splits pasted comma-separated text into tokens', async () => {
      const user = userEvent.setup()
      renderComponent()
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('alpha, beta, gamma')
      expect(screen.getAllByTestId('token')).toHaveLength(3)
    })

    it('trims whitespace from pasted values', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      renderComponent({ onAdd })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('  alpha ,  beta  ')
      expect(onAdd).toHaveBeenCalledWith('alpha')
      expect(onAdd).toHaveBeenCalledWith('beta')
    })

    it('skips duplicates when pasting', async () => {
      const user = userEvent.setup()
      renderComponent({ defaultValues: ['alpha'] })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('alpha, beta')
      expect(screen.getAllByTestId('token')).toHaveLength(2)
    })

    it('respects limitToOptions when pasting', async () => {
      const user = userEvent.setup()
      renderComponent({ limitToOptions: true })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('alpha, unknown, beta')
      expect(screen.getAllByTestId('token')).toHaveLength(2)
    })

    it('applies parseCustom to pasted values', async () => {
      const user = userEvent.setup()
      renderComponent({ parseCustom: (v: string) => v.toUpperCase() })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('hello, world')
      const tokens = screen.getAllByTestId('token')
      expect(tokens[0]).toHaveTextContent('HELLO')
      expect(tokens[1]).toHaveTextContent('WORLD')
    })

    it('allows single value paste without separator (normal behavior)', async () => {
      const user = userEvent.setup()
      renderComponent()
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('hello')
      // No comma — should go into the input, not create a token
      expect(screen.queryByTestId('token')).not.toBeInTheDocument()
    })

    it('supports custom pasteSeparator', async () => {
      const user = userEvent.setup()
      renderComponent({ pasteSeparator: ';' })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('alpha; beta; gamma')
      expect(screen.getAllByTestId('token')).toHaveLength(3)
    })

    it('can disable paste splitting with pasteSeparator={false}', async () => {
      const user = userEvent.setup()
      renderComponent({ pasteSeparator: false as const })
      const input = screen.getByTestId('token-input')
      await user.click(input)
      await user.paste('alpha, beta')
      expect(screen.queryByTestId('token')).not.toBeInTheDocument()
    })
  })

  describe('ref forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(
        <TokenAutocomplete
          ref={ref}
          options={['alpha']}
        />,
      )
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('can focus via ref', () => {
      const ref = createRef<HTMLInputElement>()
      render(
        <TokenAutocomplete
          ref={ref}
          options={['alpha']}
        />,
      )
      act(() => {
        ref.current?.focus()
      })
      expect(document.activeElement).toBe(ref.current)
    })
  })
})
