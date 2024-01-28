import React, { useContext, useState } from 'react'
import Section from '../../components/Section/Section'
import TextField from '../../components/TextField/TextField'
import Button from '../../components/Button/Button'
import {
  Login as LoginWrapper,
  LoginError,
  LoginForm,
  LoginFormField,
  LoginFormLabel,
  LoginFormLink,
  LoginFormText,
  ButtonWrapper,
} from './LoginStyles'
import { useNavigate } from 'react-router'
import { loginUser as login } from '../../utils/api/users'
import { AuthContext } from '../../context/AuthContext'
import { decodeToken } from 'react-jwt'

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { setIsLoggedIn, setRole } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async () => {
    const res = await login({ email: email, password: password })
    if (res.success) {
      localStorage.setItem('jwt', res.token)
      const jwtData = decodeToken(res.token)
      setRole(jwtData.roleId)
      setIsLoggedIn(true)
    } else {
      setError(res.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loginUser()
  }

  return (
    <LoginWrapper>
      <Section
        title="Sign in"
        subtitle="Please fill in the following fields in order to sign in:"
      >
        <LoginForm onSubmit={handleSubmit} autoComplete="on">
          <LoginFormField>
            <LoginFormLabel>Email: </LoginFormLabel>
            <TextField
              placeholder="Your email address"
              changeValue={setEmail}
              autoComplete="email-address"
            />
          </LoginFormField>
          <LoginFormField>
            <LoginFormLabel>Password:</LoginFormLabel>
            <TextField
              placeholder="Your password"
              changeValue={setPassword}
              isPassword
              autoComplete="current-password"
            />
          </LoginFormField>

          <LoginError>{error}</LoginError>
          <ButtonWrapper>
            <Button buttonText="SIGN IN" onClick={loginUser} />
          </ButtonWrapper>
          <LoginFormText>
            Don&apos;t have an account? &nbsp;
            <LoginFormLink
              onClick={() => {
                navigate('/register')
              }}
            >
              -&gt; REGISTER
            </LoginFormLink>
          </LoginFormText>
        </LoginForm>
      </Section>
    </LoginWrapper>
  )
}

// export default Login;
