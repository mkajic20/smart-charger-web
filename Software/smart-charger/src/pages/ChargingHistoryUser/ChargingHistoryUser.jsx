import React, { useEffect } from "react";
import { getUserCharges } from "../../utils/api/userHistory";

export const ChargingHistoryUser = () => {
  const fetchHistory = async () => {
    const historyData = await getUserCharges(1, 10, "");
    console.log(historyData);
    // if (cardData.success) {
    //   setCards(cardData.cards);
    //   setPages(cardData.totalPages);
    // } else {
    //   setError(cardData.message);
    // }
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  return <div>ChargingHistoryUser</div>;
};
