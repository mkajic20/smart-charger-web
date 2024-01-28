import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const Button = styled.button`
  background-color: ${(props) =>
    props.issecondary == 'true' ? colors.bgSecondary : colors.bgPrimary};
  color: white;
  border-radius: 20px;
  width: 100%;
  border: 0;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: ${colors.hover};
  }

  &:disabled {
    background-color: gray;
    &:hover {
      cursor: default;
    }
  }
`
