import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";

const handler = async (req, res) => {
  let {
    _id,
    name,
    contact,
    dob,
    gender,
    sports,
    profile_pic,
    is_organiser,
    is_participant,
    organiser_rank,
    participant_rank,
    events_participated,
    events_organised,
    prices_won,
    overall_rating,
  } = req.body;
  if (req.method == "PUT") {
    let existingUser = await Users.findByIdAndUpdate(_id, {
      name,
      contact,
      profile_pic,
      dob,
      gender,
      sports,
      is_organiser,
      is_participant,
      organiser_rank,
      participant_rank,
      events_participated,
      events_organised,
      prices_won,
      overall_rating,
    });
    res.status(200).json({ existingUser });
  } else if (req.method == "DELETE") {
    let existingUser = await Users.findByIdAndUpdate(_id, {
      is_deleted: true,
    });
    res.status(200).json({ existingUser });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
