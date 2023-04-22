import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Sports from "../../models/Sport";
import Users from "../../models/User";

const handler = async (req, res) => {
  let user = await Users.findOne({ email: req.user.email });
  if (user.is_admin) {
    if (req.method == "GET") {
      let sports = await Sports.find();
      sports = sports.filter((s) => !s.is_deleted);
      res.status(200).json(sports);
    } else {
      res.status(500).json({ error: "Invalid OpCode" });
    }
  } else {
    res.status(400).json({ error: "Unauthorised Access!" });
  }
};

export default connectDb(fetchUser(handler));
