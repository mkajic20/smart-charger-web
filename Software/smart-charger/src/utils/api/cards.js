import apiPath from "./api";

//TODO: implement API usage
//check if props are named owner, name and active
//props might need to be changed on CardManagementAdmin page as well.
export const getCardData = async (page, size) => {
  return {
    pages: 10,
    cards: [
      { id: 0, owner: "Pero Peric", name: "Kartica 1", active: true },
      { id: 1, owner: "Pero Peric 2", name: "Kartica 2", active: false },
      { id: 2, owner: "Pero Peric 3", name: "Kartica 3", active: true },
      { id: 3, owner: "Pero Peric 4", name: "Kartica 4", active: true },
      { id: 4, owner: "Pero Peric 5", name: "Kartica 5", active: true },
      { id: 5, owner: "Pero Peric 6", name: "Kartica 6", active: false },
      { id: 6, owner: "Pero Peric 7", name: "Kartica 7", active: false },
      { id: 7, owner: "Pero Peric 8", name: "Kartica 8", active: true },
      { id: 8, owner: "Pero Peric 9", name: "Kartica 9", active: true },
      { id: 9, owner: "Pero Peric 10", name: "Kartica 10", active: false },
    ],
  };
  // const jwt = localStorage.getItem("jwt");
  // const res = await fetch(`${apiPath}/api/admin/cards`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${jwt}`,
  //   },
  // });
  // const data = await res.json();
  // return data.users;
};
