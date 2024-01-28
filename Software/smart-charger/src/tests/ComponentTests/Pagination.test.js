import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Pagination from '../../components/Pagination/Pagination'

describe('Pagination', () => {
  const mockFirstCall = jest.fn()
  const mockPrevCall = jest.fn()
  const mockNextCall = jest.fn()
  const mockLastCall = jest.fn()
  const mockSelectChange = jest.fn()

  const renderComponent = (withSelect = false) => {
    render(
      <Pagination
        firstCall={mockFirstCall}
        prevCall={mockPrevCall}
        currentPage={1}
        pages={10}
        nextCall={mockNextCall}
        lastCall={mockLastCall}
        withSelect={withSelect}
        onSelectChange={mockSelectChange}
      />,
    )
  }

  it('renders Pagination component without select correctly', () => {
    renderComponent()

    expect(screen.getByText('1/10')).toBeInTheDocument()
    expect(screen.getByText('<<<')).toBeInTheDocument()
    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('>>>')).toBeInTheDocument()
  })

  it('renders Pagination component with select correctly', () => {
    renderComponent(true)

    expect(screen.getByText('1/10')).toBeInTheDocument()
    expect(screen.getByText('<<<')).toBeInTheDocument()
    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('>>>')).toBeInTheDocument()

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('75')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it("calls firstCall function when the '<<<' button is clicked", () => {
    renderComponent()

    fireEvent.click(screen.getByText('<<<'))

    expect(mockFirstCall).toHaveBeenCalled()
  })

  it("calls prevCall function when the '<' button is clicked", () => {
    renderComponent()

    fireEvent.click(screen.getByText('<'))

    expect(mockPrevCall).toHaveBeenCalled()
  })

  it("calls nextCall function when the '>' button is clicked", () => {
    renderComponent()

    fireEvent.click(screen.getByText('>'))

    expect(mockNextCall).toHaveBeenCalled()
  })

  it("calls lastCall function when the '>>>' button is clicked", () => {
    renderComponent()

    fireEvent.click(screen.getByText('>>>'))

    expect(mockLastCall).toHaveBeenCalled()
  })
})
