import apiPath from './api'

export const getCharges = async (page, pageSize, search) => {
  const jwt = localStorage.getItem('jwt')

  let path = `${apiPath}/api/admin/history?page=${page}&pageSize=${pageSize}`

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
