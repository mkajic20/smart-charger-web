import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TextField from '../../components/TextField/TextField'

describe('TextField Component', () => {
  const mockPlaceholder = 'Enter Text'
  const mockChangeValue = jest.fn()
  const mockValidateInput = jest.fn()

  it('renders without crashing', () => {
    render(<TextField />)
    expect(screen.getByRole('textbox')).toBeDefined()
  })

  it('renders with the correct placeholder', () => {
    render(<TextField placeholder={mockPlaceholder} />)
    expect(screen.getByPlaceholderText(mockPlaceholder)).toBeInTheDocument()
  })

  it('calls changeValue function on input change', () => {
    render(<TextField changeValue={mockChangeValue} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Test' } })
    expect(mockChangeValue).toHaveBeenCalledWith('Test')
  })

  it('calls validateInput function on input blur', () => {
    render(<TextField validateInput={mockValidateInput} />)
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    expect(mockValidateInput).toHaveBeenCalled()
  })

  it('toggles password visibility when isPassword is true', () => {
    render(<TextField isPassword={true} placeholder={mockPlaceholder} />)
    const input = screen.getByPlaceholderText(mockPlaceholder)
    const icon = screen.getByRole('img')

    expect(input.type).toBe('password')
    fireEvent.click(icon)
    expect(input.type).toBe('text')
  })
})
