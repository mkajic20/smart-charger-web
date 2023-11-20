import React, { useEffect, useState } from "react";
import {
  CardManagementController,
  CardManagementControl,
  CardManagementTitle,
  CardTable,
  CardTableBody,
  CardTableCell,
  CardTableCellButton,
  CardTableCellDelete,
  CardTableCellDeleteIcon,
  CardTableHead,
  CardTableHeader,
  CardTableRow,
  PopupButtonWrapper,
} from "./CardManagementAdminStyles";
import {
  changeCardActivation,
  deleteCard,
  getCardData,
} from "../../utils/api/cards";
import Icon from "../../assets/trash-icon.png";
import Pagination from "../../components/Pagination/Pagination";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";

export const CardManagementAdmin = () => {
  const [cards, setCards] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [changedCard, setChangedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  const fetchCardDataAndSetState = async () => {
    const cardData = await getCardData(currentPage, pageSize, searchTerm);
    console.log(cardData);
    setCards(cardData.cards);
    setPages(cardData.totalPages);
  };

  useEffect(() => {
    fetchCardDataAndSetState();
  }, [currentPage, pageSize, searchTerm]);

  const changeActivation = async (cardId) => {
    await changeCardActivation(cardId);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, active: !card.active } : card
      )
    );
  };

  const cardDelete = async (cardId) => {
    await deleteCard(cardId);
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <>
      <CardManagementTitle>RFID card management</CardManagementTitle>
      <CardManagementController>
        <CardManagementControl></CardManagementControl>
        <CardManagementControl>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            prevCall={async () => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await fetchCardDataAndSetState();
              }
            }}
            firstCall={async () => {
              setCurrentPage(1);
              await fetchCardDataAndSetState();
            }}
            nextCall={async () => {
              if (currentPage < pages) {
                setCurrentPage(currentPage + 1);
                await fetchCardDataAndSetState();
              }
            }}
            lastCall={async () => {
              setCurrentPage(pages);
              await fetchCardDataAndSetState();
            }}
          ></Pagination>
        </CardManagementControl>
        <CardManagementControl>
          <Search
            placeholder="Search"
            onCancel={() => {
              setSearchTerm("");
            }}
            search={async (term) => {
              setSearchTerm(term);
            }}
            showCancel={searchTerm.trim().length > 0}
          />
        </CardManagementControl>
      </CardManagementController>

      <CardTable>
        <CardTableHead>
          <CardTableRow>
            <CardTableHeader>Owner</CardTableHeader>
            <CardTableHeader>Card Name</CardTableHeader>
            <CardTableHeader>Active</CardTableHeader>
            <CardTableHeader></CardTableHeader>
          </CardTableRow>
        </CardTableHead>
        <CardTableBody>
          {cards.map((card, index) => (
            <CardTableRow key={index}>
              <CardTableCell>
                {card.user.firstName} {card.user.lastName}
              </CardTableCell>
              <CardTableCell>{card.name}</CardTableCell>
              <CardTableCellButton
                onClick={() => {
                  setChangedCard(card);
                }}
              >
                {card.active ? "Deactivate" : "Activate"}
              </CardTableCellButton>
              <CardTableCellDelete>
                <CardTableCellDeleteIcon
                  src={Icon}
                  onClick={() => {
                    setDeletedCard(card);
                  }}
                />
              </CardTableCellDelete>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>

      {changedCard !== null && (
        <PopupWindow
          title={changedCard.active ? "Deactivate Card?" : "Activate Card?"}
          text={`Are you sure you want to ${
            changedCard.active ? "deactivate" : "activate"
          } card ${changedCard.name}?`}
          onClose={() => {
            setChangedCard(null);
          }}
        >
          <PopupButtonWrapper>
            <Button
              buttonText="Yes"
              onClick={async () => {
                await changeActivation(changedCard.id);
                setChangedCard(null);
              }}
            />
            <Button
              buttonText="No"
              onClick={() => {
                setChangedCard(null);
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}

      {deletedCard !== null && (
        <PopupWindow
          title={"Delete Card?"}
          text={`Are you sure you want to delete card ${deletedCard.name}?`}
          onClose={() => {
            setDeletedCard(null);
          }}
        >
          <PopupButtonWrapper>
            <Button
              buttonText="Yes"
              onClick={async () => {
                await cardDelete(deletedCard.id);
                setDeletedCard(null);
              }}
            />
            <Button
              buttonText="No"
              onClick={() => {
                setDeletedCard(null);
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}
    </>
  );
};
