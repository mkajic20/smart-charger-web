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
  const data = await res.json();
  return data.users;
};

export const getAllRoles = async () => {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(`${apiPath}/api/admin/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();
  return data.roles;
};

export const changeUserRole = async (userId, newRoleId) => {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(`${apiPath}/api/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const changeUserActivation = async (userId) => {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(`${apiPath}/api/admin/users/${userId}/activate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
};
