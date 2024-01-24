import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  } else {
    return children
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
}

export default ProtectedRoute
