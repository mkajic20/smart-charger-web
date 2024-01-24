import apiPath from './api'

export const getStatistics = async (chargerId, year, month) => {
  const jwt = localStorage.getItem('jwt')
  const res = await fetch(
    `${apiPath}/api/admin/statistics?chargerId=${chargerId}&year=${year}&month=${month}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    },
  )

  const data = await res.json()
  return data
}
