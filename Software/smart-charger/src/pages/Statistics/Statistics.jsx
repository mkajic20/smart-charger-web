import React, { useEffect, useState } from 'react'
import { getStatistics } from '../../utils/api/statistics'
import { useParams } from 'react-router'
import { getChargerById } from '../../utils/api/chargers'
import MonthPicker from '../../components/MonthPicker/MonthPicker'
import {
  StatisticsSectionWrapper,
  StatisticsWrapper,
  StatisticsText,
  StatisticsLayout,
  StatisticDescription,
  StatisticValue,
  StatisticsLayoutRow,
} from './StatisticsStyles'
import Section from '../../components/Section/Section'
import { reverseGeocode } from '../../utils/api/geocode'
import { formatDate } from '../../utils/date'
import MapComponent from '../../components/MapComponent/MapComponent'
import { Title } from '../../utils/styles/generalStyles'

export const Statistics = () => {
  const { id } = useParams()

  const [error, setError] = useState('.')
  const [charger, setCharger] = useState({})

  const [currentmonth, setCurrentMonth] = useState(0)
  const [currentyear, setCurrentYear] = useState(0)

  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)

  const [location, setLocation] = useState('')
  const [created, setCreated] = useState('')

  const [volume, setVolume] = useState(100)
  const [charges, setCharges] = useState(100)

  const getMonth = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return 'January'
      case 2:
        return 'February'
      case 3:
        return 'March'
      case 4:
        return 'April'
      case 5:
        return 'May'
      case 6:
        return 'June'
      case 7:
        return 'July'
      case 8:
        return 'August'
      case 9:
        return 'September'
      case 10:
        return 'October'
      case 11:
        return 'November'
      case 12:
        return 'December'
      default:
        return 'Invalid month number'
    }
  }

  const setCurrentDate = async () => {
    const currentDate = new Date()
    setMonth(currentDate.getMonth() + 1)
    setCurrentMonth(currentDate.getMonth() + 1)
    setYear(currentDate.getFullYear())
    setCurrentYear(currentDate.getFullYear())
  }

  const fetchCharger = async () => {
    const data = await getChargerById(id)
    if (data.success) {
      const charger = data.charger
      setCreated(formatDate(charger.creationTime))
      let location = await reverseGeocode(charger.latitude, charger.longitude)
      location = location.split(',')[0]
      setLocation(location)
      setCharger(charger)
    } else {
      setError(data.message)
    }
  }

  const fetchStatistics = async () => {
    if (month === 0 || year === 0) return
    const data = await getStatistics(id, year, month)
    if (data.success) {
      const totalVolume = data.events.reduce(
        (sum, event) => sum + event.volume,
        0,
      )
      const roundedVolume = parseFloat(totalVolume.toFixed(5))
      setCharges(data.events.length)
      setVolume(roundedVolume)
      setError('')
    } else {
      setError(data.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await setCurrentDate()
      await fetchCharger()
      await fetchStatistics()
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetchStatistics()
  }, [month, year])

  return (
    <>
      <Title>Charger statistics</Title>
      <StatisticsSectionWrapper>
        <Section title={`Charger ${charger.name}`}>
          <StatisticsWrapper>
            <MonthPicker
              month={`${getMonth(month)} ${year}`}
              enableNext={!(month === currentmonth && year === currentyear)}
              clickNext={() => {
                setError('.')
                if (!(month === currentmonth && year === currentyear)) {
                  if (month === 12) {
                    setMonth(1)
                    setYear(year + 1)
                  } else {
                    setMonth(month + 1)
                  }
                }
              }}
              clickPrev={() => {
                setError('.')
                if (month === 1) {
                  setMonth(12)
                  setYear(year - 1)
                } else {
                  setMonth(month - 1)
                }
              }}
            />
            {!error.length && (
              <>
                <StatisticsLayout>
                  <tbody>
                    <StatisticsLayoutRow>
                      <StatisticDescription>Location: </StatisticDescription>
                      <StatisticValue>{location}</StatisticValue>
                    </StatisticsLayoutRow>

                    <StatisticsLayoutRow>
                      <StatisticDescription>
                        Charger created:{' '}
                      </StatisticDescription>
                      <StatisticValue>{created}</StatisticValue>
                    </StatisticsLayoutRow>

                    <StatisticsLayoutRow>
                      <StatisticDescription>
                        Total volume:{' '}
                      </StatisticDescription>
                      <StatisticValue>{volume} kW</StatisticValue>
                    </StatisticsLayoutRow>

                    <StatisticsLayoutRow>
                      <StatisticDescription>
                        Number of charges:
                      </StatisticDescription>
                      <StatisticValue>{charges}</StatisticValue>
                    </StatisticsLayoutRow>
                  </tbody>
                </StatisticsLayout>
                {Object.keys(charger).length > 0 && (
                  <MapComponent
                    setCenter
                    centerLatitude={charger.latitude}
                    centerLongitude={charger.longitude}
                    markers={[charger]}
                  />
                )}
              </>
            )}
            {error.length > 0 && error !== '.' && (
              <>
                <StatisticsText>{error}</StatisticsText>
              </>
            )}
          </StatisticsWrapper>
        </Section>
      </StatisticsSectionWrapper>
    </>
  )
}
