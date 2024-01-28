import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const Section = styled.div`
  background-color: ${colors.bgSecondary};
  border-radius: 20px;
  color: ${colors.textPrimary};
  text-align: center;
`

export const SectionTitle = styled.h2`
  padding-top: 25px;
`

export const SectionSubtitle = styled.p`
  padding: 15px 0;
`
