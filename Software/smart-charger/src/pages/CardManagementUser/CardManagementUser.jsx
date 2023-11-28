import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const asyncCall = async () => {
      const cardData = await getAllUsersCards();
      if (cardData.success) {
        setCards(cardData.cards);
      } else {
        setError(cardData.message);
      }
    };
    asyncCall();
  }, []);

  const cardDelete = async (cardId) => {
    await deleteCard(cardId);
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };
  return (
    <>
      {error.length == 0 && cards.length > 0 && (
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
                    {card.active ? "Active" : "Inactive"}
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
        </>
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

      {error.length > 0 && (
        <PopupWindow
          title={"User doesn't have RFID cards"}
          onClose={async () => {
            setError("");
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              navigate("/");
              setError("");
            }}
          />
        </PopupWindow>
      )}
    </>
  );
};
