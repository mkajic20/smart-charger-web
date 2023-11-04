import apiPath from "./api";

export const registerUser = async (user) => {
  try {
    const res = await fetch(`${apiPath}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
};

export const loginUser = async (user) => {
  try {
    const res = await fetch(`${apiPath}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
};
