import React, { useEffect, useState } from 'react'
import MapComponent from '../../components/MapComponent/MapComponent'
import { getAllChargers } from '../../utils/api/chargers'
import PopupWindow from '../../components/PopupWindow/PopupWindow'
import { Button } from '../../components/Button/ButtonStyles'
import { useNavigate } from 'react-router'

export const Map = () => {
  const [chargers, setChargers] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchAllChargers = async () => {
    const chargerData = await getAllChargers()
    if (chargerData.success) {
      setChargers(chargerData.chargers)
    } else {
      setError(chargerData.message)
    }
  }

  useEffect(() => {
    fetchAllChargers()
  }, [])

  return (
    <>
      <MapComponent biggerMap markers={chargers} />

      {error.length > 0 && (
        <PopupWindow
          title={'There was an error'}
          text={error}
          onClose={async () => {
            navigate('/')
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              navigate('/')
            }}
          />
        </PopupWindow>
      )}
    </>
  )
}
