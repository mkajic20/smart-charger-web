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

export const CardManagementAdmin = () => {
  const [cards, setCards] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [changedCard, setChangedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  const fetchCardData = async () => {
    const cardData = await getCardData(currentPage, pageSize);
    setCards(cardData.cards);
    setPages(cardData.pages);
  };

  useEffect(() => {
    const asyncCall = async () => {
      await fetchCardData();
    };

    asyncCall();
  }, []);

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
                fetchCardData();
              }
            }}
            firstCall={async () => {
              setCurrentPage(1);
              fetchCardData();
            }}
            nextCall={async () => {
              if (currentPage < pages) {
                setCurrentPage(currentPage + 1);
                fetchCardData();
              }
            }}
            lastCall={async () => {
              setCurrentPage(pages);
              fetchCardData();
            }}
          ></Pagination>
        </CardManagementControl>
        <CardManagementControl></CardManagementControl>
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
              <CardTableCell>{card.owner}</CardTableCell>
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
