import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import jwt from "jsonwebtoken";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { token } = req.body;
  if (req.method == "GET") {
    let users = await Users.find();
    users = users.filter((e) => !e.is_deleted);
    res.status(200).json({ users });
  } else if (req.method == "POST") {
    let tokenData = jwt.verify(token, process.env.SECRETKEY);
    let user = await Users.findOne({ _id: tokenData.user._id });
    if (user.is_deleted) {
      res.status(500).json({ error: "No User Found" });
    } else {
      res.status(200).json({ user });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
