import React, { useEffect, useRef, useState } from "react";
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
  TextFieldLabel,
  CreateError,
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
import MapComponent from "../../components/MapComponent/MapComponent";
import TextField from "../../components/TextField/TextField";

export const ChargerManagement = () => {
  const [chargers, setChargers] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [deletedCharger, setDeletedCharger] = useState(null);
  const [creatingCharger, setCreatingCharger] = useState(false);

  const [error, setError] = useState("");

  const [chargerName, setChargerName] = useState("");
  const [chargerLocation, setChargerLocation] = useState(null);

  const [createError, setCreateError] = useState("");

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

  const removeCharger = async (chargerId) => {
    await deleteCharger(chargerId);
    setChargers((prevChargers) =>
      prevChargers.filter((charger) => charger.id !== chargerId)
    );
  };

  return (
    <>
      <ChargerManagementTitle>Charger management</ChargerManagementTitle>
      <ChargerManagementController>
        <ChargerManagementControl>
          <Button
            buttonText="Create charger"
            isSecondary
            onClick={() => {
              setCreatingCharger(true);
            }}
          />
        </ChargerManagementControl>
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
                <ChargerTableCellDeleteIcon
                  src={Icon}
                  onClick={() => {
                    setDeletedCharger(charger);
                  }}
                />
              </ChargerTableCellDelete>
            </ChargerTableRow>
          ))}
        </ChargerTableBody>
      </ChargerTable>

      {deletedCharger !== null && (
        <PopupWindow
          title={"Delete Charger?"}
          text={`Are you sure you want to delete charger ${deletedCharger.name}?`}
          onClose={() => {
            setDeletedCharger(null);
          }}
        >
          <PopupButtonWrapper>
            <Button
              buttonText="Yes"
              onClick={async () => {
                await removeCharger(deletedCharger.id);
                setDeletedCharger(null);
              }}
            />
            <Button
              buttonText="No"
              onClick={() => {
                setDeletedCharger(null);
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}

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

      {creatingCharger && (
        <PopupWindow
          title={"Create charger"}
          text=""
          onClose={() => {
            setCreatingCharger(false);
            setChargerName("");
            setChargerLocation(null);
            setCreateError("");
          }}
        >
          <TextFieldLabel>Charger name:</TextFieldLabel>
          <TextField
            placeholder="Charger name..."
            changeValue={setChargerName}
            validateInput={() => {}}
          />
          <MapComponent
            setMarkerLocation={(marker) => {
              setChargerLocation(marker);
            }}
          />
          {createError && <CreateError>{createError}</CreateError>}
          <PopupButtonWrapper>
            <Button
              buttonText="Create"
              onClick={async () => {
                if (
                  chargerName.trim().length === 0 ||
                  chargerLocation == null
                ) {
                  setCreateError("You must choose name and location!");
                } else {
                  setCreateError("");
                  const data = await createCharger(
                    chargerName,
                    chargerLocation.lat,
                    chargerLocation.lng
                  );
                  if (data.success) {
                    setCreatingCharger(false);
                    setCurrentPage(1);
                    setSearchTerm("");
                    setChargerName("");
                    setChargerLocation(null);
                    await fetchChargerData();
                  } else {
                    setCreateError(data.error);
                  }
                }
              }}
            />
            <Button
              buttonText="Cancel"
              onClick={() => {
                setCreatingCharger(false);
                setChargerName("");
                setChargerLocation(null);
                setCreateError("");
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}
    </>
  );
};
