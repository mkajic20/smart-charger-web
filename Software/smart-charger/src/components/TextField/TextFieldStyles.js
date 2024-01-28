import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const TextFieldWrapper = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${colors.formPrimary};
  border: 1px solid ${colors.formPrimary};
  padding: 5px;
  display: flex;
`

export const TextFieldInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`

export const TextFieldIcon = styled.img`
  &:hover {
    cursor: pointer;
  }
`
