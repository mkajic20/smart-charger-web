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
} from "./CardManagementAdminStyles";
import { getCardData } from "../../utils/api/cards";
import Icon from "../../assets/trash-icon.png";
import Pagination from "../../components/Pagination/Pagination";

export const CardManagementAdmin = () => {
  const [cards, setCards] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
              <CardTableCellButton onClick={() => {}}>
                {card.active ? "Deactivate" : "Activate"}
              </CardTableCellButton>
              <CardTableCellDelete>
                <CardTableCellDeleteIcon src={Icon} />
              </CardTableCellDelete>
            </CardTableRow>
          ))}
        </CardTableBody>
      </CardTable>
    </>
  );
};
