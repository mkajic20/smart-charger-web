import React, { useEffect, useState } from "react";
import {
  CardManagementTitle,
  CardTable,
  CardTableBody,
  CardTableCell,
  CardTableCellButton,
  CardTableHead,
  CardTableHeader,
  CardTableRow,
} from "./CardManagementAdminStyles";
import { getAllCards } from "../../utils/api/cards";

export const CardManagementAdmin = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const asyncCall = async () => {
      const cardData = await getAllCards();
      setCards(cardData);
    };

    asyncCall();
  }, []);
  return (
    <>
      <CardManagementTitle>RFID card management</CardManagementTitle>
      <CardTable>
        <CardTableHead>
          <CardTableRow>
            <CardTableHeader>Owner</CardTableHeader>
            <CardTableHeader>Card Name</CardTableHeader>
            <CardTableHeader>Active</CardTableHeader>
          </CardTableRow>
        </CardTableHead>
        <CardTableBody>
          {cards.map((card, index) => (
            <CardTableRow key={index}>
              <CardTableCell>{card.owner}</CardTableCell>
              <CardTableCell>{card.name}</CardTableCell>
              <CardTableCellButton onClick={() => {}}>
                {card.active ? "Deactivate" : "Activate"}
              </CardTableCellButton>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </>
  );
};
