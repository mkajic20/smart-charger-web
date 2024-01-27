import React, { useContext, useState } from 'react'
import Section from '../../components/Section/Section'
import {
  ButtonWrapper,
  RegisterError,
  RegisterForm,
  RegisterFormError,
  RegisterFormField,
  RegisterFormLabel,
  RegisterFormLink,
  RegisterFormText,
  RegisterWrapper,
} from './RegisterStyles'
import TextField from '../../components/TextField/TextField'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'
import {
  loginUser as login,
  registerUser as register,
} from '../../utils/api/users'
import { AuthContext } from '../../context/AuthContext'
import { decodeToken } from 'react-jwt'

export const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { setIsLoggedIn, setRole } = useContext(AuthContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const registerUser = async () => {
    if (
      validateFirstName() &&
      validateLastName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      let res = await register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      if (!res.success) {
        setError(res.error)
      } else {
        await loginUser({
          email: email,
          password: password,
        })
      }
    }
  }

  const loginUser = async (user) => {
    const res = await login(user)
    if (res.success) {
      localStorage.setItem('jwt', res.token)
      const jwtData = decodeToken(res.token)
      setRole(jwtData.roleId)
      setIsLoggedIn(true)
    } else {
      setError(res.error)
    }
  }

  const validateFirstName = () => {
    if (firstName.trim().length === 0) {
      setFirstNameError("First name can't be empty!")
      return false
    } else {
      setFirstNameError('')
      return true
    }
  }

  const validateLastName = () => {
    if (lastName.trim().length === 0) {
      setLastNameError("Last name can't be empty!")
      return false
    } else {
      setLastNameError('')
      return true
    }
  }

  const validateEmail = () => {
    // const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i
    if (!emailRegex.test(email)) {
      setEmailError('Email is invalid!')
      return false
    } else {
      setEmailError('')
      return true
    }
  }

  const validatePassword = () => {
    if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters long!')
      return false
    } else {
      setPasswordError('')
      return true
    }
  }

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords must match!')
      return false
    } else {
      setConfirmPasswordError('')
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await registerUser()
  }

  return (
    <RegisterWrapper>
      <Section
        title="Create account"
        subtitle="Please fill in the following fields in order to register:"
      >
        <RegisterForm onSubmit={handleSubmit}>
          <RegisterFormField>
            <RegisterFormLabel>First name:</RegisterFormLabel>
            <TextField
              placeholder="Your first name"
              changeValue={setFirstName}
              validateInput={() => {
                validateFirstName()
              }}
            />
            <RegisterFormError>{firstNameError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Last name:</RegisterFormLabel>
            <TextField
              placeholder="Your last name"
              changeValue={setLastName}
              validateInput={validateLastName}
            />
            <RegisterFormError>{lastNameError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Email:</RegisterFormLabel>
            <TextField
              placeholder="Your email"
              changeValue={setEmail}
              validateInput={() => {
                validateEmail()
              }}
            />
            <RegisterFormError>{emailError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Password:</RegisterFormLabel>
            <TextField
              placeholder="Your password"
              changeValue={setPassword}
              isPassword
              validateInput={validatePassword}
            />
            <RegisterFormError>{passwordError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Confirm password:</RegisterFormLabel>
            <TextField
              placeholder="Confirm password"
              changeValue={setConfirmPassword}
              isPassword
              validateInput={validateConfirmPassword}
            />
            <RegisterFormError>{confirmPasswordError}</RegisterFormError>
          </RegisterFormField>

          <RegisterError>{error}</RegisterError>

          <ButtonWrapper>
            <Button buttonText="REGISTER" />
          </ButtonWrapper>
          <RegisterFormText>
            Already have an account? &nbsp;
            <RegisterFormLink
              onClick={() => {
                navigate('/login')
              }}
            >
              -&gt; LOGIN
            </RegisterFormLink>
          </RegisterFormText>
        </RegisterForm>
      </Section>
    </RegisterWrapper>
  )
}
