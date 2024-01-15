import React, { useEffect, useState } from "react";
import { getUserCharges } from "../../utils/api/userHistory";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
import { formatDate } from "../../utils/date";
import { reverseGeocode } from "../../utils/api/geocode";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import {
  Control,
  Controller,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
} from "../../utils/styles/generalStyles";

export const ChargingHistoryUser = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    const historyData = await getUserCharges(page, 10, searchTerm);
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
  }, [page, searchTerm]);
  return (
    <>
      {error.length === 0 && (
        <>
          <Title>Charging history</Title>
          <Controller>
            <Control></Control>
            <Control>
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
            </Control>
            <Control>
              <Search
                placeholder={"Search history"}
                onCancel={async () => {
                  setPage(1);
                  setSearchTerm("");
                }}
                search={async (term) => {
                  setPage(1);
                  setSearchTerm(term);
                }}
                showCancel={searchTerm.trim().length > 0}
              />
            </Control>
          </Controller>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Start</TableHeader>
                <TableHeader>End</TableHeader>
                <TableHeader>Volume</TableHeader>
                <TableHeader>Card</TableHeader>
                <TableHeader>Charger</TableHeader>
                <TableHeader>Location</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(item.startTime)}</TableCell>
                  <TableCell>{formatDate(item.endTime)}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.card.name}</TableCell>
                  <TableCell>{item.charger.name}</TableCell>
                  <TableCell>{item.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
