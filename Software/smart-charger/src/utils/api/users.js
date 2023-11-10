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
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(`${apiPath}/api/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  console.log(res);

  const data = await res.json();
  return data.users;
};

export const getAllRoles = async () => {
  return [
    { id: 1, name: "Admin" },
    { id: 2, name: "Customer" },
  ];
};

export const changeUserRole = async (userId, newRoleId) => {};

export const changeUserActivation = async (userId) => {};
