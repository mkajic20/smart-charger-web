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
} from "./HistoryStyles";
import { Button } from "../../components/Button/ButtonStyles";
import { formatDate } from "../../utils/date";
import { reverseGeocode } from "../../utils/api/geocode";

export const ChargingHistoryUser = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const fetchHistory = async () => {
    const historyData = await getUserCharges(1, 100, "");

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
  }, []);
  return (
    <>
      {error.length === 0 && (
        <>
          <HistoryTitle>Charging history</HistoryTitle>
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
