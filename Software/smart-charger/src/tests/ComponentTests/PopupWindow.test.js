import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import PopupWindow from '../../components/PopupWindow/PopupWindow'

describe('PopupWindow', () => {
  const mockTitle = 'Popup Title'
  const mockText = 'Popup Text'
  const mockChildren = <div>Popup Children</div>
  const mockOnClose = jest.fn()

  it('renders PopupWindow component correctly', () => {
    render(
      <PopupWindow title={mockTitle} text={mockText} onClose={mockOnClose}>
        {mockChildren}
      </PopupWindow>,
    )

    expect(screen.getByText(mockTitle)).toBeInTheDocument()
    expect(screen.getByText(mockText)).toBeInTheDocument()
    expect(screen.getByText('Popup Children')).toBeInTheDocument()
  })

  it('does not call onClose function when children inside PopupWindowContent are clicked', () => {
    render(
      <PopupWindow title={mockTitle} text={mockText} onClose={mockOnClose}>
        {mockChildren}
      </PopupWindow>,
    )

    const children = screen.getByText('Popup Children')
    fireEvent.click(children)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('renders PopupWindowContent when title or text are provided', () => {
    render(
      <PopupWindow text={mockText} onClose={mockOnClose}>
        {mockChildren}
      </PopupWindow>,
    )

    const content = screen.getByText('Popup Children')
    expect(content).toBeInTheDocument()
  })
})
