import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let users = await Users.find();
    users = users.filter((e) => !e.is_deleted);
    let organisers = users
      .filter((e) => e.is_organiser)
      .sort((a, b) => b.organiser_rank - a.organiser_rank);
    let participants = users
      .filter((e) => e.is_participant)
      .sort((a, b) => b.participant_rank - a.participant_rank);
    res.status(200).json({ organisers, participants });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
