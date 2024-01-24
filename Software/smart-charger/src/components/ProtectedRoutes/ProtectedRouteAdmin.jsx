import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, role } = useContext(AuthContext)

  if (isLoggedIn && role == 1) {
    return children
  } else {
    return <Navigate to="/login" replace />
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
}

export default ProtectedRoute
