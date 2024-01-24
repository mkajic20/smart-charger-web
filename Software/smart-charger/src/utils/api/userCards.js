import apiPath from './api'
import { decodeToken } from 'react-jwt'

export const getAllUsersCards = async () => {
  const jwt = localStorage.getItem('jwt')
  const jwtData = decodeToken(jwt)
  const userId = jwtData.userId
  let path = `${apiPath}/api/users/${userId}/cards`
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

export const deleteCard = async (cardId) => {
  const jwt = localStorage.getItem('jwt')
  const jwtData = decodeToken(jwt)
  const userId = jwtData.userId
  let path = `${apiPath}/api/users/${userId}/cards/${cardId}`
  await fetch(path, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  })
}
