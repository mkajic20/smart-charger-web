import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import MonthPicker from '../../components/MonthPicker/MonthPicker'

describe('MonthPicker', () => {
  const mockMonth = 'January'
  const mockClickPrev = jest.fn()
  const mockClickNext = jest.fn()

  it('renders MonthPicker component correctly', () => {
    render(
      <MonthPicker
        month={mockMonth}
        clickPrev={mockClickPrev}
        clickNext={mockClickNext}
        enableNext={true}
      />,
    )

    expect(screen.getByText(mockMonth)).toBeInTheDocument()
    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('calls clickPrev function when the previous button is clicked', () => {
    render(
      <MonthPicker
        month={mockMonth}
        clickPrev={mockClickPrev}
        clickNext={mockClickNext}
        enableNext={true}
      />,
    )

    const prevButton = screen.getByText('<')
    fireEvent.click(prevButton)

    expect(mockClickPrev).toHaveBeenCalled()
  })

  it('calls clickNext function when the next button is clicked and is not disabled', () => {
    render(
      <MonthPicker
        month={mockMonth}
        clickPrev={mockClickPrev}
        clickNext={mockClickNext}
        enableNext={true}
      />,
    )

    const nextButton = screen.getByText('>')
    fireEvent.click(nextButton)

    expect(mockClickNext).toHaveBeenCalled()
  })
})
