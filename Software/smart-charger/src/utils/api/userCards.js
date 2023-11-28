import apiPath from "./api";
import { decodeToken } from "react-jwt";

export const getAllUsersCards = async () => {
  const jwt = localStorage.getItem("jwt");
  try {
    const jwtData = decodeToken(jwt);
    const userId = jwtData.userId;
    let path = `${apiPath}/users/${userId}/cards`;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const deleteCard = async (cardId) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const jwtData = decodeToken(jwt);
    const userId = jwtData.userId;
    let path = `${apiPath}/users/${userId}/cards/${cardId}`;
    const res = await fetch(path, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.success);
  } catch (error) {
    console.log("error: ", error);
  }
};
