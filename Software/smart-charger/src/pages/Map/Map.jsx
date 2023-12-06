import React, { useEffect, useState } from "react";
import MapComponent from "../../components/MapComponent/MapComponent";
import { getAllChargers } from "../../utils/api/chargers";

export const Map = () => {
  const [chargers, setChargers] = useState([]);
  const [error, setError] = useState("");

  const fetchAllChargers = async () => {
    const chargerData = await getAllChargers();
    if (chargerData.success) {
      setChargers(chargerData.chargers);
    } else {
      setError(chargerData.message);
    }
  };

  useEffect(() => {
    fetchAllChargers();
  }, []);

  return <MapComponent biggerMap markers={chargers} />;
};
