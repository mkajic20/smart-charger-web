import apiPath from "./api";

export const getAllUsersCards = async () => {
  return [
    { id: 0, name: "Kartica 1", active: true },
    { id: 1, name: "Kartica 2", active: false },
    { id: 2, name: "Kartica 3", active: true },
    { id: 3, name: "Kartica 4", active: true },
    { id: 4, name: "Kartica 5", active: true },
  ];
};

export const deleteCard = async (cardId, userId) => {};
