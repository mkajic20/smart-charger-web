import apiPath from './api'

export const getCardData = async (page, size, search) => {
  const jwt = localStorage.getItem('jwt')
  let path = `${apiPath}/api/admin/cards?page=${page}&pageSize=${size}`

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

export const changeCardActivation = async (cardId) => {
  const jwt = localStorage.getItem('jwt')
  await fetch(`${apiPath}/api/admin/cards/${cardId}/active`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export const deleteCard = async (cardId) => {
  const jwt = localStorage.getItem('jwt')
  await fetch(`${apiPath}/api/admin/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
}
