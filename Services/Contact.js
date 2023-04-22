const getAllEnquires = async () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/contact", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  const json = await response.json();
  return json;
};

const resolveEnquiry = async (data) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/contact", {
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

const raiseEnquiry = async (message) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ message }),
  });
  const json = await response.json();
  return json;
};

export { getAllEnquires, resolveEnquiry, raiseEnquiry };
