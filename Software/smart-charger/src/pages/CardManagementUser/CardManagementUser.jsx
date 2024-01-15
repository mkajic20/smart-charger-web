import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "../../assets/trash-icon.png";
import { getAllUsersCards, deleteCard } from "../../utils/api/userCards";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableCellDelete,
  TableCellIcon,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  PopupButtonWrapper,
} from "../../utils/styles/generalStyles";

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
          <Title> My cards</Title>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Card Name</TableHeader>
                <TableHeader>Active</TableHeader>
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card, index) => (
                <TableRow key={index}>
                  <TableCell>{card.name}</TableCell>
                  <TableCell>{card.active ? "Active" : "Inactive"}</TableCell>
                  <TableCellDelete>
                    <TableCellIcon
                      src={DeleteIcon}
                      onClick={() => {
                        setDeletedCard(card);
                      }}
                    />
                  </TableCellDelete>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
