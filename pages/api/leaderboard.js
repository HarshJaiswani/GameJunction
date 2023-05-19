import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let users = await Users.find({
      is_email_verified: true,
      is_deleted: false,
    });
    let organisers = users
      .filter((e) => e.is_organiser)
      .sort((a, b) => b.organiser_points - a.organiser_points);
    let participants = users
      .filter((e) => e.is_participant)
      .sort((a, b) => b.participant_points - a.participant_points);
    return res.status(200).json({ organisers, participants });
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
