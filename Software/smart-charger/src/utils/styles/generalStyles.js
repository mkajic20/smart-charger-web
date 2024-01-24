import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

export const Main = styled.main`
  padding-bottom: 237px;
`

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: white;
`

export const Controller = styled.div`
  width: 62vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 20px;
`

export const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Table = styled.table`
  margin: 0 auto;
  margin-top: 30px;
  max-width: 80vw;
`

export const TableHead = styled.thead``

export const TableBody = styled.tbody``

export const TableHeader = styled.th`
  padding: 5px;
  background-color: ${colors.tableHeader};
  font-size: 18px;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.tableBackgroundSecondary};
  }
  &:nth-child(odd) {
    background-color: ${colors.tableBackgroundPrimary};
  }
`

export const TableCell = styled.td`
  color: white;
  padding: 5px;
  width: 15vw;
  text-align: center;
`

export const TableCellButton = styled.td`
  color: white;
  padding: 7px;
  width: 20vw;
  text-align: center;
  &:hover {
    background-color: ${colors.bgPrimary};
    cursor: pointer;
  }
`

export const TableCellDelete = styled.td``

export const TableCellIcon = styled.img`
  width: 2vw;
  &:hover {
    cursor: pointer;
  }
`

export const PopupButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`
