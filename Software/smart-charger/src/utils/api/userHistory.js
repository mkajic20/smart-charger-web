import apiPath from './api'
import { decodeToken } from 'react-jwt'

export const getUserCharges = async (page, size, search) => {
  const jwt = localStorage.getItem('jwt')
  const jwtData = decodeToken(jwt)
  const userId = jwtData.userId

  let path = `${apiPath}/api/users/${userId}/history?page=${page}&pageSize=${size}`

  if (search.trim().length > 0) {
    path += `&search=${search}`
  }

  const res = await fetch(path, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  return data
}
