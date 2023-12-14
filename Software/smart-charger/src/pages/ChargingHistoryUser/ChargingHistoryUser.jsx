import React, { useEffect, useState } from "react";
import { getUserCharges } from "../../utils/api/userHistory";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import {
  HistoryTitle,
  HistoryTable,
  HistoryTableHead,
  HistoryTableBody,
  HistoryTableHeader,
  HistoryTableRow,
  HistoryTableCell,
  HistoryController,
  HistoryControl,
} from "./HistoryStyles";
import Button from "../../components/Button/Button";
import { formatDate } from "../../utils/date";
import { reverseGeocode } from "../../utils/api/geocode";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";

export const ChargingHistoryUser = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    const historyData = await getUserCharges(page, 10, searchTerm);
    console.log(historyData);
    //TODO: set total pages

    if (historyData.success) {
      const chargedEvents = historyData.events.map(async (item) => {
        const address = await getAddress(
          item.charger.latitude,
          item.charger.longitude
        );

        return {
          ...item,
          address: address,
        };
      });

      const updatedHistory = await Promise.all(chargedEvents);
      setHistory(updatedHistory);
    } else {
      setError(historyData.message);
    }
  };

  const getAddress = async (lat, lng) => {
    const address = await reverseGeocode(lat, lng);
    return address;
  };

  useEffect(() => {
    fetchHistory();
  }, [page, searchTerm]);
  return (
    <>
      {error.length === 0 && (
        <>
          <HistoryTitle>Charging history</HistoryTitle>
          <HistoryController>
            <HistoryControl></HistoryControl>
            <HistoryControl>
              <Pagination
                currentPage={page}
                pages={totalPages}
                firstCall={async () => {
                  setPage(1);
                  await fetchHistory();
                }}
                lastCall={async () => {
                  setPage(totalPages);
                  await fetchHistory();
                }}
                nextCall={async () => {
                  if (page < totalPages) {
                    setPage(page + 1);
                    await fetchHistory();
                  }
                }}
                prevCall={async () => {
                  if (page > 1) {
                    setPage(page - 1);
                    await fetchHistory();
                  }
                }}
              />
            </HistoryControl>
            <HistoryControl>
              <Search
                placeholder={"Search history"}
                onCancel={() => {
                  setCurrentPage(1);
                  setSearchTerm("");
                }}
                search={(term) => {
                  setCurrentPage(1);
                  setSearchTerm(term);
                }}
                showCancel={searchTerm.trim().length > 0}
              />
            </HistoryControl>
          </HistoryController>
          <HistoryTable>
            <HistoryTableHead>
              <HistoryTableRow>
                <HistoryTableHeader>Start</HistoryTableHeader>
                <HistoryTableHeader>End</HistoryTableHeader>
                <HistoryTableHeader>Volume</HistoryTableHeader>
                <HistoryTableHeader>Card</HistoryTableHeader>
                <HistoryTableHeader>Charger</HistoryTableHeader>
                <HistoryTableHeader>Location</HistoryTableHeader>
              </HistoryTableRow>
            </HistoryTableHead>
            <HistoryTableBody>
              {history.map((item, index) => (
                <HistoryTableRow key={index}>
                  <HistoryTableCell>
                    {formatDate(item.startTime)}
                  </HistoryTableCell>
                  <HistoryTableCell>
                    {formatDate(item.endTime)}
                  </HistoryTableCell>
                  <HistoryTableCell>{item.volume}</HistoryTableCell>
                  <HistoryTableCell>{item.card.name}</HistoryTableCell>
                  <HistoryTableCell>{item.charger.name}</HistoryTableCell>
                  <HistoryTableCell>{item.address}</HistoryTableCell>
                </HistoryTableRow>
              ))}
            </HistoryTableBody>
          </HistoryTable>
        </>
      )}

      {error.length > 0 && (
        <PopupWindow
          title={"There was an error"}
          text={error}
          onClose={async () => {
            await fetchHistory();
            setError("");
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              await fetchHistory();
              setError("");
            }}
          />
        </PopupWindow>
      )}
    </>
  );
};
