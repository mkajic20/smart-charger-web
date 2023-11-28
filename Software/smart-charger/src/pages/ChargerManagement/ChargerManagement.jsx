import React, { useEffect, useState } from "react";
import {
  ChargerManagementController,
  ChargerManagementControl,
  ChargerManagementTitle,
  ChargerTable,
  ChargerTableBody,
  ChargerTableCell,
  ChargerTableCellDelete,
  ChargerTableCellDeleteIcon,
  ChargerTableHead,
  ChargerTableHeader,
  ChargerTableRow,
  PopupButtonWrapper,
} from "./ChargerManagementStyles";
import {
  createCharger,
  deleteCharger,
  getChargerData,
} from "../../utils/api/chargers";
import Icon from "../../assets/trash-icon.png";
import Pagination from "../../components/Pagination/Pagination";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";

export const ChargerManagement = () => {
  const [chargers, setChargers] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [error, setError] = useState("");

  const fetchChargerData = async () => {
    const chargerData = await getChargerData(currentPage, pageSize, searchTerm);
    if (chargerData.success) {
      setChargers(chargerData.chargers);
      setPages(chargerData.totalPages);
    } else {
      setError(chargerData.message);
    }
  };

  useEffect(() => {
    fetchChargerData();
  }, [currentPage, pageSize, searchTerm]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year}. ${hours}:${minutes}`;
  };

  return (
    <>
      <ChargerManagementTitle>Charger management</ChargerManagementTitle>
      <ChargerManagementController>
        <ChargerManagementControl></ChargerManagementControl>
        <ChargerManagementControl>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            prevCall={async () => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await fetchChargerData();
              }
            }}
            firstCall={async () => {
              setCurrentPage(1);
              await fetchChargerData();
            }}
            nextCall={async () => {
              if (currentPage < pages) {
                setCurrentPage(currentPage + 1);
                await fetchChargerData();
              }
            }}
            lastCall={async () => {
              setCurrentPage(pages);
              await fetchChargerData();
            }}
          ></Pagination>
        </ChargerManagementControl>
        <ChargerManagementControl>
          <Search
            placeholder="Search"
            onCancel={() => {
              setCurrentPage(1);
              setSearchTerm("");
            }}
            search={async (term) => {
              setCurrentPage(1);
              setSearchTerm(term);
            }}
            showCancel={searchTerm.trim().length > 0}
          />
        </ChargerManagementControl>
      </ChargerManagementController>

      <ChargerTable>
        <ChargerTableHead>
          <ChargerTableRow>
            <ChargerTableHeader>Name</ChargerTableHeader>
            <ChargerTableHeader>Latitude</ChargerTableHeader>
            <ChargerTableHeader>Longitude</ChargerTableHeader>
            <ChargerTableHeader>Creation time</ChargerTableHeader>
            <ChargerTableHeader>Last used</ChargerTableHeader>
            <ChargerTableHeader></ChargerTableHeader>
          </ChargerTableRow>
        </ChargerTableHead>
        <ChargerTableBody>
          {chargers.map((charger, index) => (
            <ChargerTableRow key={index}>
              <ChargerTableCell>{charger.name}</ChargerTableCell>
              <ChargerTableCell>{charger.longitude}</ChargerTableCell>
              <ChargerTableCell>{charger.latitude}</ChargerTableCell>
              <ChargerTableCell>
                {formatDate(charger.creationTime)}
              </ChargerTableCell>
              <ChargerTableCell>
                {charger.lastSync ? formatDate(charger.lastSync) : "-"}
              </ChargerTableCell>
              <ChargerTableCellDelete>
                <ChargerTableCellDeleteIcon src={Icon} onClick={() => {}} />
              </ChargerTableCellDelete>
            </ChargerTableRow>
          ))}
        </ChargerTableBody>
      </ChargerTable>

      {error.length > 0 && (
        <PopupWindow
          title={"There was an error"}
          text={error}
          onClose={async () => {
            setSearchTerm("");
            await fetchChargerData();
            setError("");
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              setSearchTerm("");
              await fetchChargerData();
              setError("");
            }}
          />
        </PopupWindow>
      )}
    </>
  );
};
