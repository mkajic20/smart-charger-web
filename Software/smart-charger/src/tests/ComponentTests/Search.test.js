import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Search from '../../components/Search/Search'

const mockPlaceholder = 'Search Here'
const mockSearch = jest.fn()
const mockOnCancel = jest.fn()

describe('Search Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Search />)
    expect(container.firstChild).toBeDefined()
  })

  it('renders with the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <Search placeholder={mockPlaceholder} />,
    )
    expect(getByPlaceholderText(mockPlaceholder)).toBeInTheDocument()
  })

  it('calls search function when search icon is clicked and input is not empty', () => {
    const { getByAltText, getByPlaceholderText } = render(
      <Search
        placeholder={mockPlaceholder}
        search={mockSearch}
        showCancel={false}
        onCancel={mockOnCancel}
      />,
    )

    const input = getByPlaceholderText(mockPlaceholder)
    fireEvent.change(input, { target: { value: 'test query' } })

    const searchIcon = getByAltText('Search icon')
    fireEvent.click(searchIcon)

    expect(mockSearch).toHaveBeenCalledWith('test query')
  })

  it('calls onCancel function when cancel icon is clicked', () => {
    const { getByAltText } = render(
      <Search
        placeholder={mockPlaceholder}
        search={mockSearch}
        showCancel={true}
        onCancel={mockOnCancel}
      />,
    )

    const cancelIcon = getByAltText('Cancel icon')
    fireEvent.click(cancelIcon)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('calls search function when Enter key is pressed', () => {
    const { getByPlaceholderText, getByAltText } = render(
      <Search
        placeholder={mockPlaceholder}
        search={mockSearch}
        showCancel={false}
        onCancel={mockOnCancel}
      />,
    )

    const input = getByPlaceholderText(mockPlaceholder)
    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(mockSearch).toHaveBeenCalledWith('test query')
  })

  it('calls onCancel function when Escape key is pressed', () => {
    const { getByPlaceholderText } = render(
      <Search
        placeholder={mockPlaceholder}
        search={mockSearch}
        showCancel={true}
        onCancel={mockOnCancel}
      />,
    )

    const input = getByPlaceholderText(mockPlaceholder)
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })

    expect(mockOnCancel).toHaveBeenCalled()
  })
})
