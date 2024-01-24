import apiPath from './api'

export const registerUser = async (user) => {
  const res = await fetch(`${apiPath}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()
  return data
}

export const loginUser = async (user) => {
  const res = await fetch(`${apiPath}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()
  return data
}

export const getAllUsers = async (page, pageSize, search) => {
  const jwt = localStorage.getItem('jwt')

  let path = `${apiPath}/api/admin/users?page=${page}&pageSize=${pageSize}`

  if (search.trim().length > 0) {
    path += `&search=${search}`
  }

  const res = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  const data = await res.json()
  return data
}

export const getAllRoles = async () => {
  const jwt = localStorage.getItem('jwt')
  const res = await fetch(`${apiPath}/api/admin/roles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  const data = await res.json()
  return data.roles
}

export const changeUserRole = async (userId, newRoleId) => {
  const jwt = localStorage.getItem('jwt')
  await fetch(`${apiPath}/api/admin/users/${userId}/role/${newRoleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export const changeUserActivation = async (userId) => {
  const jwt = localStorage.getItem('jwt')
  await fetch(`${apiPath}/api/admin/users/${userId}/activate`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
}
