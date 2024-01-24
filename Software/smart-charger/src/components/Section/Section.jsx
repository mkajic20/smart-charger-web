import React from 'react'
import PropTypes from 'prop-types'
import {
  SectionSubtitle,
  SectionTitle,
  Section as SectionWrapper,
} from './SectionStyles'

const Section = ({ title, subtitle, children }) => {
  return (
    <SectionWrapper>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
      {children}
    </SectionWrapper>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
}

export default Section
