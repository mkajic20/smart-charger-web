import React, { useEffect, useState } from "react";
import { getStatistics } from "../../utils/api/statistics";

export const Statistics = () => {
  const [error, setError] = useState("");

  const fetchStatistics = async () => {
    const data = await getStatistics(1, 2023, 12);
    if (data.success) {
      console.log(data);
    } else {
      setError(data.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return <div>Statistics</div>;
};
