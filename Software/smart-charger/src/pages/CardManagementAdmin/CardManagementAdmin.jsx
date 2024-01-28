import React, { useEffect, useState } from 'react'
import {
  changeCardActivation,
  deleteCard,
  getCardData,
} from '../../utils/api/cards'
import DeleteIcon from '../../assets/trash-icon.png'
import Pagination from '../../components/Pagination/Pagination'
import PopupWindow from '../../components/PopupWindow/PopupWindow'
import Button from '../../components/Button/Button'
import Search from '../../components/Search/Search'
import {
  Control,
  Controller,
  Table,
  TableBody,
  TableCell,
  TableCellButton,
  TableCellDelete,
  TableCellIcon,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  PopupButtonWrapper,
  LoaderWrapper,
} from '../../utils/styles/generalStyles'
import { Blocks } from 'react-loader-spinner'

export const CardManagementAdmin = () => {
  const [cards, setCards] = useState([])
  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  const [changedCard, setChangedCard] = useState(null)
  const [deletedCard, setDeletedCard] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const fetchCardData = async () => {
    setLoading(true)

    try {
      const cardData = await getCardData(currentPage, pageSize, searchTerm)
      if (cardData.success) {
        setCards(cardData.cards)
        setPages(cardData.totalPages)
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCardData()
  }, [currentPage, pageSize, searchTerm])

  const changeActivation = async (cardId) => {
    await changeCardActivation(cardId)
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, active: !card.active } : card,
      ),
    )
  }

  const cardDelete = async (cardId) => {
    await deleteCard(cardId)
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId))
  }

  return (
    <>
      {error.length === 0 && (
        <>
          <Title>RFID card management</Title>
          <Controller>
            <Control></Control>
            <Control>
              <Pagination
                pages={pages}
                currentPage={currentPage}
                prevCall={async () => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                  }
                }}
                firstCall={async () => {
                  setCurrentPage(1)
                }}
                nextCall={async () => {
                  if (currentPage < pages) {
                    setCurrentPage(currentPage + 1)
                  }
                }}
                lastCall={async () => {
                  setCurrentPage(pages)
                }}
                withSelect
                onSelectChange={async (size) => {
                  setPageSize(size)
                  setCurrentPage(1)
                }}
              />
            </Control>
            <Control>
              <Search
                placeholder="Search"
                onCancel={() => {
                  setCurrentPage(1)
                  setSearchTerm('')
                }}
                search={(term) => {
                  setCurrentPage(1)
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
                    <TableHeader>Owner</TableHeader>
                    <TableHeader>Card Name</TableHeader>
                    <TableHeader>Active</TableHeader>
                    <TableHeader></TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cards.map((card, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {card.user.firstName} {card.user.lastName}
                      </TableCell>
                      <TableCell>{card.name}</TableCell>
                      <TableCellButton
                        onClick={() => {
                          setChangedCard(card)
                        }}
                      >
                        {card.active ? 'Deactivate' : 'Activate'}
                      </TableCellButton>
                      <TableCellDelete>
                        <TableCellIcon
                          src={DeleteIcon}
                          onClick={() => {
                            setDeletedCard(card)
                          }}
                        />
                      </TableCellDelete>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )}

      {changedCard !== null && (
        <PopupWindow
          title={changedCard.active ? 'Deactivate Card?' : 'Activate Card?'}
          text={`Are you sure you want to ${
            changedCard.active ? 'deactivate' : 'activate'
          } card ${changedCard.name}?`}
          onClose={() => {
            setChangedCard(null)
          }}
        >
          <PopupButtonWrapper>
            <Button
              buttonText="Yes"
              onClick={async () => {
                await changeActivation(changedCard.id)
                setChangedCard(null)
              }}
            />
            <Button
              buttonText="No"
              onClick={() => {
                setChangedCard(null)
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}

      {deletedCard !== null && (
        <PopupWindow
          title={'Delete Card?'}
          text={`Are you sure you want to delete card ${deletedCard.name}?`}
          onClose={() => {
            setDeletedCard(null)
          }}
        >
          <PopupButtonWrapper>
            <Button
              buttonText="Yes"
              onClick={async () => {
                await cardDelete(deletedCard.id)
                setDeletedCard(null)
              }}
            />
            <Button
              buttonText="No"
              onClick={() => {
                setDeletedCard(null)
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}

      {error.length > 0 && (
        <PopupWindow
          title={'There was an error'}
          text={error}
          onClose={async () => {
            setError('')
            setSearchTerm('')
            setCurrentPage(1)
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              setError('')
              setSearchTerm('')
              setCurrentPage(1)
            }}
          />
        </PopupWindow>
      )}
    </>
  )
}
