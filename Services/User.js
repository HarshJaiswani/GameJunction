const currentUser = async () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/getusers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();
  return data;
};

const createUser = async (data) => {
  const reponse = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await reponse.json();
  return json;
};

const loginUser = async (data) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const forgotPassword = async (data) => {
  const response = await fetch("/api/login", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const changePassword = async (data) => {
  const response = await fetch("/api/changepassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const updateUser = async (data) => {
  const reponse = await fetch("/api/updateuser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify(data),
  });
  const json = await reponse.json();
  return json;
};

const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/getusers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  const json = await response.json();
  return json;
};

const leaderboard = async () => {
  const response = await fetch("/api/leaderboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

const deactivateUser = async () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/updateuser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  const json = await response.json();
  return json;
};

export {
  currentUser,
  createUser,
  loginUser,
  updateUser,
  forgotPassword,
  getAllUsers,
  leaderboard,
  changePassword,
  deactivateUser,
};
