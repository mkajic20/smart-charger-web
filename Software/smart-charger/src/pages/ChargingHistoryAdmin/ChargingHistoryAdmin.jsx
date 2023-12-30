import React, { useEffect, useState } from "react";
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
} from "./HistoryAdminStyles";
import Button from "../../components/Button/Button";
import { formatDate } from "../../utils/date";
import { reverseGeocode } from "../../utils/api/geocode";
import { getCharges } from "../../utils/api/adminHistory";
import Pagination from "../../components/Pagination/Pagination";

export const ChargingHistoryAdmin = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchHistory = async () => {
    const historyData = await getCharges(1, 10, "");
    setTotalPages(historyData.totalPages);

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
  });

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
            <HistoryControl></HistoryControl>
          </HistoryController>
          <HistoryTable>
            <HistoryTableHead>
              <HistoryTableRow>
                <HistoryTableHeader>User</HistoryTableHeader>
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
                    {item.user.firstName} {item.user.lastName}
                  </HistoryTableCell>
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
