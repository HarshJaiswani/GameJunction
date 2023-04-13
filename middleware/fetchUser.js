import jwt from "jsonwebtoken";

const fetchUser = (handler) => (req, res) => {
  // get the user from the jwt token and add id and name to req object
  const token = req.headers["auth-token"];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRETKEY);
    req.user = data.user;
    handler(req, res);
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
