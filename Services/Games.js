const getAllGames = async () => {
  const response = await fetch("/api/sport", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

const getAllAdminGames = async () => {
  const response = await fetch("/api/fetchadmingames", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
  });
  const json = await response.json();
  return json;
};

const verifyGames = async (id) => {
  const response = await fetch("/api/sport", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id, is_verified: true }),
  });
  const json = await response.json();
  return json;
};

const addGame = async (data) => {
  const reponse = await fetch("/api/sport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await reponse.json();
  return json;
};

export { getAllGames, getAllAdminGames, verifyGames, addGame };
