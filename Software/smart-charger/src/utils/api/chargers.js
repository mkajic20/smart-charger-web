import apiPath from "./api";
import { decodeToken } from "react-jwt";

export const getChargerData = async (page, size, search) => {
  const jwt = localStorage.getItem("jwt");
  let path = `${apiPath}/api/admin/chargers?page=${page}&pageSize=${size}`;

  if (search.trim().length > 0) {
    path += `&search=${search}`;
  }

  const res = await fetch(path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const deleteCharger = async (chargerId) => {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(`${apiPath}/api/admin/chargers/${chargerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const createCharger = async (name, latitude, longitude) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const jwtData = decodeToken(jwt);
    const userId = jwtData.userId;

    const charger = {
      Name: name,
      Latitude: latitude,
      Longitude: longitude,
      CreatorId: userId,
    };

    const res = await fetch(`${apiPath}/api/admin/chargers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(charger),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
