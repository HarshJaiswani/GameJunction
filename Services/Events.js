const getAllEvents = async () => {
  const response = await fetch("/api/getevents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

const createEvent = async (data) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const reponse = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(data),
  });
  const json = await reponse.json();
  return json;
};

const updateEvent = async (data) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const reponse = await fetch("/api/events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(data),
  });
  const json = await reponse.json();
  return json;
};

const applyIntoEvent = async (id, isApplied, team_id) => {
  const response = await fetch("/api/applyintoevent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify({ eventId: id, isApplied, team_id }),
  });
  const json = await response.json();
  return json;
};

const addToWishList = async (id, isWishlisted) => {
  const response = await fetch("/api/wishlist-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify({ eventId: id, toAdd: !isWishlisted }),
  });
  const json = await response.json();
  return json;
};

const getUserEvents = async (ids) => {
  const response = await fetch("/api/getevents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify({ eventids: ids }),
  });
  const json = await response.json();
  return json;
};

const getEventParticipants = async (ids) => {
  const response = await fetch("/api/fetchparticipants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify({ userids: ids }),
  });
  const json = await response.json();
  return json;
};

const deleteEvent = async (id) => {
  const response = await fetch("/api/events", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify({ _id: id }),
  });
  const json = await response.json();
  return json;
};

const setWinner = async (id, winId) => {
  const response = await fetch("/api/events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": JSON.parse(localStorage.getItem("auth-token")),
    },
    body: JSON.stringify({
      _id: id,
      winner: winId,
    }),
  });
  const json = await response.json();
  return json;
};

const getSingleEvent = async (slug) => {
  const response = await fetch("/api/fetchsingleevent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
  const json = await response.json();
  return json;
};

export {
  getAllEvents,
  createEvent,
  updateEvent,
  applyIntoEvent,
  addToWishList,
  getUserEvents,
  getEventParticipants,
  deleteEvent,
  setWinner,
  getSingleEvent,
};
