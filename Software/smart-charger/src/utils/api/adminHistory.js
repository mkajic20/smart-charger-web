import apiPath from "./api";

export const getCharges = async (page, pageSize, search) => {
  const jwt = localStorage.getItem("jwt");

  let path = `${apiPath}/api/admin/history?page=${page}&pageSize=${pageSize}`;

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

  // return {
  //   events: [
  //     {
  //       startTime: "2023-12-15T00:13:15.894Z",
  //       endTime: "2023-12-15T00:14:15.415Z",
  //       volume: 10,
  //       charger: {
  //         name: "Moj punjac",
  //         latitude: 46.308371709552304,
  //         longitude: 16.33776426315308,
  //         creationTime: "2023-12-14T15:11:22.538098Z",
  //         active: true,
  //         creatorId: 1,
  //         id: 1,
  //       },
  //       card: {
  //         value: "string",
  //         active: true,
  //         name: "string",
  //       },
  //       user: {
  //         firstName: "Mladen",
  //         lastName: "Kajic",
  //         email: "mkajic20@foi.hr",
  //       },
  //       id: 1,
  //     },
  //     {
  //       startTime: "2023-12-15T00:13:15.894Z",
  //       endTime: "2023-12-15T00:14:15.415Z",
  //       volume: 10,
  //       charger: {
  //         name: "Drugi punjac",
  //         latitude: 46.30868302537521,
  //         longitude: 16.340591311454777,
  //         creationTime: "2023-12-14T15:11:40.512264Z",
  //         active: false,
  //         creatorId: 1,
  //         id: 2,
  //       },
  //       card: {
  //         value: "string",
  //         active: true,
  //         name: "string",
  //       },
  //       user: {
  //         firstName: "Mladen",
  //         lastName: "Kajic",
  //         email: "mkajic20@foi.hr",
  //       },
  //       id: 2,
  //     },
  //   ],
  //   success: true,
  //   message: "List of all users' events",
  //   page: 1,
  //   totalPages: 1,
  // };
};
