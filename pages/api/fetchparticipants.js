import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let all_participants = await Users.find();
      all_participants = all_participants.filter((e) => !e.is_deleted);
      all_participants = all_participants.filter((e) =>
        req.body.userids.includes(e._id.toString())
      );
      res.status(200).json({ all_participants });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
