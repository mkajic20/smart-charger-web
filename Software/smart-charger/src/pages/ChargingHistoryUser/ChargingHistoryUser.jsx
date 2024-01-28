import React, { useEffect, useState } from 'react'
import { getUserCharges } from '../../utils/api/userHistory'
import PopupWindow from '../../components/PopupWindow/PopupWindow'
import Button from '../../components/Button/Button'
import { formatDate } from '../../utils/date'
import { reverseGeocode } from '../../utils/api/geocode'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'
import {
  Control,
  Controller,
  LoaderWrapper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
} from '../../utils/styles/generalStyles'
import { Blocks } from 'react-loader-spinner'

export const ChargingHistoryUser = () => {
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    setLoading(true)

    const historyData = await getUserCharges(page, pageSize, searchTerm)
    setTotalPages(historyData.totalPages)

    try {
      if (historyData.success) {
        const chargedEvents = historyData.events.map(async (item) => {
          const address = await getAddress(
            item.charger.latitude,
            item.charger.longitude,
          )

          return {
            ...item,
            address: address,
          }
        })

        const updatedHistory = await Promise.all(chargedEvents)
        setHistory(updatedHistory)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getAddress = async (lat, lng) => {
    const address = await reverseGeocode(lat, lng)
    return address
  }

  useEffect(() => {
    fetchHistory()
  }, [page, searchTerm, pageSize])
  return (
    <>
      {error.length === 0 && (
        <>
          <Title>Charging history</Title>
          <Controller>
            <Control></Control>
            <Control>
              <Pagination
                currentPage={page}
                pages={totalPages}
                firstCall={async () => {
                  setPage(1)
                }}
                lastCall={async () => {
                  setPage(totalPages)
                }}
                nextCall={async () => {
                  if (page < totalPages) {
                    setPage(page + 1)
                  }
                }}
                prevCall={async () => {
                  if (page > 1) {
                    setPage(page - 1)
                  }
                }}
                withSelect
                onSelectChange={async (size) => {
                  setPageSize(size)
                  setPage(1)
                }}
              />
            </Control>
            <Control>
              <Search
                placeholder={'Search history'}
                onCancel={async () => {
                  setPage(1)
                  setSearchTerm('')
                }}
                search={async (term) => {
                  setPage(1)
                  setSearchTerm(term)
                }}
                showCancel={searchTerm.trim().length > 0}
              />
            </Control>
          </Controller>

          {loading ? (
            <LoaderWrapper>
              <Blocks
                height="150"
                width="150"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </LoaderWrapper>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Start</TableHeader>
                    <TableHeader>End</TableHeader>
                    <TableHeader>Volume</TableHeader>
                    <TableHeader>Card</TableHeader>
                    <TableHeader>Charger</TableHeader>
                    <TableHeader>Location</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(item.startTime)}</TableCell>
                      <TableCell>{formatDate(item.endTime)}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.card.name}</TableCell>
                      <TableCell>{item.charger.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )}

      {error.length > 0 && (
        <PopupWindow
          title={'There was an error'}
          text={error}
          onClose={async () => {
            setError('')
            setSearchTerm('')
            setPage(1)
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              setError('')
              setSearchTerm('')
              setPage(1)
            }}
          />
        </PopupWindow>
      )}
    </>
  )
}
