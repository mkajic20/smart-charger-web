import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const UserTableRole = styled.select`
  padding: 5px;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;

  appearance: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff' width='18px' height='18px'%3E%3Cpath d='M24 24H0V0h24v24z' fill='none' opacity='.87'/%3E%3Cpath d='M8.62 12.62L12 16l3.38-3.38L18 14l-6 6-6-6 1.62-1.62z'/%3E%3C/svg%3E")
    no-repeat right 8px center/12px;
`

export const UserTableRoleOption = styled.option`
  background-color: ${colors.tableBackgroundPrimary};
  color: white;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;

  &:hover {
    background-color: ${colors.bgPrimary};
    cursor: pointer;
  }
`
