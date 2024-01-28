import React from 'react'
import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { decodeToken } from 'react-jwt'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('jwt') ? true : false,
  )
  const [role, setRole] = useState(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      const data = decodeToken(token)
      return data.roleId
    } else {
      return null
    }
  })

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
