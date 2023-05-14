const createTeam = async (teamName) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ team_name: teamName }),
  });
  const json = await response.json();
  return json;
};

const fetchAllTeamsOfUser = async () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/teams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  const json = await response.json();
  return json;
};

const fetchAllInvitations = async () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/invitations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  const json = await response.json();
  return json;
};

const updateTeam = async (data) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/teams", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const deleteTeam = async (team_id) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/teams", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ team_id }),
  });
  const json = await response.json();
  return json;
};

const addTeamMember = async (data) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/invitations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const updateInvite = async (data) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/invitations", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

export {
  fetchAllTeamsOfUser,
  fetchAllInvitations,
  createTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  updateInvite,
};
