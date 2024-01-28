import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const PaginationButton = styled.button`
  font-weight: bold;
  color: white;
  background-color: ${colors.bgSecondary};
  border: 0;
  min-width: 2vw;
  padding: 3px;
  &:hover {
    cursor: pointer;
    background-color: ${colors.tableBackgroundPrimary};
  }
`

export const PaginationPage = styled.p`
  display: inline;
  color: white;
  font-weight: bold;
`

export const PaginationSelect = styled.select`
  background-color: ${colors.bgSecondary};
  color: white;
  font-weight: bold;
`

export const PaginationSelectOption = styled.option``
