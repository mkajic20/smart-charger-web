import React, { useState, useEffect } from "react";
import {
  CardManagementControl,
  CardManagementController,
  CardManagementTitle,
  CardTable,
  CardTableBody,
  CardTableHead,
  CardTableHeader,
  CardTableRow,
  CardTableCell,
  CardTableCellDelete,
  CardTableCellDeleteIcon,
  PopupButtonWrapper,
} from "./CardManagementUserStyles";
import Icon from "../../assets/trash-icon.png";
import { getAllUsersCards, deleteCard } from "../../utils/api/userCards";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
export const CardManagementUser = () => {
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);

  useEffect(() => {
    const asyncCall = async () => {
      const cardData = await getAllUsersCards();
      setCards(cardData);
    };
    asyncCall();
  }, []);

  var userId = 2; //need to get real userId from jwt, aswell as cardId
  const cardDelete = async (cardId) => {
    await deleteCard(cardId, userId);
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };
  return (
    <>
      <CardManagementTitle> My cards</CardManagementTitle>
      <CardManagementController>
        <CardManagementControl></CardManagementControl>
      </CardManagementController>
      <CardTable>
        <CardTableHead>
          <CardTableRow>
            <CardTableHeader>Card Name</CardTableHeader>
            <CardTableHeader>Active</CardTableHeader>
            <CardTableHeader></CardTableHeader>
          </CardTableRow>
        </CardTableHead>
        <CardTableBody>
          {cards.map((card, index) => (
            <CardTableRow key={index}>
              <CardTableCell>{card.name}</CardTableCell>
              <CardTableCell>
                {card.active ? "Inactive" : "Active"}
              </CardTableCell>
              <CardTableCellDelete>
                <CardTableCellDeleteIcon
                  src={Icon}
                  onClick={() => {
                    setDeletedCard(card);
                  }}
                ></CardTableCellDeleteIcon>
              </CardTableCellDelete>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>

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
                await cardDelete(deletedCard.id, userId);
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
