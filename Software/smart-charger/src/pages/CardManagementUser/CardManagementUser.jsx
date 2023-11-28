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
} from "./CardManagementUserStyles";
import Icon from "../../assets/trash-icon.png";
import { getAllUsersCards } from "../../utils/api/userCards";
export const CardManagementUser = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const asyncCall = async () => {
      const cardData = await getAllUsersCards();
      setCards(cardData);
    };
    asyncCall();
  }, []);
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
                  onClick={() => {}}
                ></CardTableCellDeleteIcon>
              </CardTableCellDelete>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </>
  );
};
