import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const Search = styled.div`
  background-color: ${colors.formPrimary};
  display: flex;
  padding: 5px;
  align-items: center;
  width: 100%;
`

export const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`

export const SearchBarIcon = styled.img`
  height: 20px;
  &:hover {
    cursor: pointer;
  }
`
