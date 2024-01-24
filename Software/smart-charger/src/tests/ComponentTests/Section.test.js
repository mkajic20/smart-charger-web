import React from 'react'
import { render } from '@testing-library/react'
import Section from '../../components/Section/Section'

describe('Section Component', () => {
  const mockTitle = 'Test Title'
  const mockSubtitle = 'Test Subtitle'

  it('renders without crashing', () => {
    const { container } = render(<Section />)
    expect(container.firstChild).toBeDefined()
  })

  it('renders title correctly', () => {
    const { getByText } = render(<Section title={mockTitle} />)
    expect(getByText(mockTitle)).toBeInTheDocument()
  })

  it('renders subtitle correctly', () => {
    const { getByText } = render(<Section subtitle={mockSubtitle} />)
    expect(getByText(mockSubtitle)).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <Section>
        <div>Test Children</div>
      </Section>,
    )
    expect(getByText('Test Children')).toBeInTheDocument()
  })

  it('renders both title and subtitle correctly', () => {
    const { getByText } = render(
      <Section title={mockTitle} subtitle={mockSubtitle} />,
    )
    expect(getByText(mockTitle)).toBeInTheDocument()
    expect(getByText(mockSubtitle)).toBeInTheDocument()
  })
})
