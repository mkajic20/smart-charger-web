import React, { useEffect, useRef, useState } from "react";
import { TextFieldLabel, CreateError } from "./ChargerManagementStyles";
import {
  Control,
  Controller,
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
import {
  createCharger,
  deleteCharger,
  getChargerData,
} from "../../utils/api/chargers";
import DeleteIcon from "../../assets/trash-icon.png";
import StatisticsIcon from "../../assets/statistics-icon.png";
import Pagination from "../../components/Pagination/Pagination";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import MapComponent from "../../components/MapComponent/MapComponent";
import TextField from "../../components/TextField/TextField";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

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

  const removeCharger = async (chargerId) => {
    await deleteCharger(chargerId);
    setChargers((prevChargers) =>
      prevChargers.filter((charger) => charger.id !== chargerId)
    );
  };

  return (
    <>
      <Title>Charger management</Title>
      <Controller>
        <Control>
          <Button
            buttonText="Create charger"
            isSecondary
            onClick={() => {
              setCreatingCharger(true);
            }}
          />
        </Control>
        <Control>
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
        </Control>
        <Control>
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
        </Control>
      </Controller>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Latitude</TableHeader>
            <TableHeader>Longitude</TableHeader>
            <TableHeader>Creation time</TableHeader>
            <TableHeader>Last used</TableHeader>
            <TableHeader></TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {chargers.map((charger, index) => (
            <TableRow key={index}>
              <TableCell>{charger.name}</TableCell>
              <TableCell>{charger.latitude}</TableCell>
              <TableCell>{charger.longitude}</TableCell>
              <TableCell>{formatDate(charger.creationTime)}</TableCell>
              <TableCell>
                {charger.lastSync ? formatDate(charger.lastSync) : "-"}
              </TableCell>
              <TableCellDelete>
                <TableCellIcon
                  src={StatisticsIcon}
                  onClick={() => {
                    navigate(`/statistics/${charger.id}`);
                  }}
                />
              </TableCellDelete>
              <TableCellDelete>
                <TableCellIcon
                  src={DeleteIcon}
                  onClick={() => {
                    setDeletedCharger(charger);
                  }}
                />
              </TableCellDelete>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
            clickMarker
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
