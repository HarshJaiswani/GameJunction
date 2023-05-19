import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import jwt from "jsonwebtoken";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { token } = req.body;
  if (req.method == "GET") {
    let user = await Users.findOne({ email: req.user.email });
    if (user && user.is_admin) {
      let users = await Users.find({
        is_email_verified: true,
        is_deleted: false,
      });
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ error: "Unauthorised Access!" });
    }
  } else if (req.method == "POST") {
    let tokenData = jwt.verify(token, process.env.SECRETKEY);
    let user = await Users.findOne({ _id: tokenData.user._id });
    if (user && user.is_deleted) {
      return res.status(500).json({ error: "No User Found" });
    } else {
      return res.status(200).json({ user });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
