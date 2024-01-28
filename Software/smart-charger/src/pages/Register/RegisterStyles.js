import styled from 'styled-components'
import { breakpoints } from '../../utils/styles/theme'

export const RegisterWrapper = styled.div`
  max-width: 50vw;
  margin: 100px auto;

  @media screen and (${breakpoints.desktop}) {
    max-width: 30vw;
  }
`

export const RegisterForm = styled.form`
  max-width: 35vw;
  margin: 20px auto 0 auto;
  padding-bottom: 50px;

  @media screen and (${breakpoints.desktop}) {
    max-width: 20vw;
  }
`

export const RegisterFormField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`

export const RegisterFormLabel = styled.label`
  margin: 15px 0 10px 0;
`

export const RegisterFormError = styled.p`
  color: #ff9300;
  font-size: 14px;
  margin-top: 5px;
  height: 17px;
`

export const ButtonWrapper = styled.div`
  max-width: 20vw;
  margin: 20px auto 0;
`

export const RegisterFormText = styled.div`
  margin-top: 10px;
`

export const RegisterFormLink = styled.p`
  display: inline;
  &:hover {
    cursor: pointer;
  }
`

export const RegisterError = styled.p`
  color: #ff9300;
  font-size: 16px;
  height: 17px;
  font-weight: bold;
`
