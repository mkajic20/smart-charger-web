import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const Header = styled.header`
  background-color: ${colors.bgSecondary};
  display: flex;
  justify-content: space-between;
`

export const HeaderInner = styled.div`
  width: 100%;
  height: 80px;
  align-items: center;
  display: flex;
`

export const HeaderLogo = styled.img`
  height: 70px;
  &:hover {
    cursor: pointer;
  }
`

export const HeaderTitle = styled.h2`
  color: ${colors.textPrimary};
  &:hover {
    cursor: pointer;
  }
`

export const HeaderButtonWrapper = styled.div`
  margin-right: 1%;
  min-width: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`

export const HeaderNav = styled.nav`
  margin: 0 100px;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`

export const HeaderLink = styled.a`
  color: white;
  &:hover {
    cursor: pointer;
  }
`
