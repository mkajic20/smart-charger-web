import apiPath from "./api";

export const registerUser = async (user) => {
  const res = await fetch(`${apiPath}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return data;
};

export const loginUser = async (user) => {
  const res = await fetch(`${apiPath}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return data;
};

export const getAllUsers = async () => {
  return [
    {
      id: 0,
      firstName: "Ivan",
      lastName: "Ivic",
      email: "ivan@gmail.com",
      active: true,
      roleId: 1,
    },
    {
      id: 1,
      firstName: "Ivo",
      lastName: "Ivic",
      email: "ivan2@gmail.com",
      active: false,
      roleId: 1,
    },
    {
      id: 2,
      firstName: "Ivana",
      lastName: "Ivic",
      email: "ivan3@gmail.com",
      active: true,
      roleId: 2,
    },
    {
      id: 3,
      firstName: "Ivan",
      lastName: "Ivic",
      email: "ivan4@gmail.com",
      active: false,
      roleId: 2,
    },
    {
      id: 4,
      firstName: "Ivo",
      lastName: "Ivic",
      email: "ivan5@gmail.com",
      active: true,
      roleId: 1,
    },
    {
      id: 5,
      firstName: "Ivana",
      lastName: "Ivic",
      email: "ivan6@gmail.com",
      active: false,
      roleId: 2,
    },
    {
      id: 6,
      firstName: "Ivan",
      lastName: "Ivic",
      email: "ivan7@gmail.com",
      active: true,
      roleId: 1,
    },
    {
      id: 7,
      firstName: "Ivana",
      lastName: "Ivic",
      email: "ivan8@gmail.com",
      active: false,
      roleId: 2,
    },
  ];
};

export const getAllRoles = async () => {
  return [
    { id: 1, name: "Admin" },
    { id: 2, name: "Customer" },
  ];
};

export const changeUserRole = async (userId, newRoleId) => {};
