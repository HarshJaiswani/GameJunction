import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";

const handler = async (req, res) => {
  let {
    name,
    contact,
    dob,
    gender,
    sports,
    profile_pic,
    is_organiser,
    is_participant,
    events_participated,
    events_organised,
    prices_won,
  } = req.body;
  if (req.method == "PUT") {
    let existingUser = await Users.findByIdAndUpdate(req.user._id, {
      name,
      contact,
      profile_pic,
      dob,
      gender,
      sports,
      is_organiser,
      is_participant,
      events_participated,
      events_organised,
      prices_won,
    });
    return res.status(200).json({ existingUser });
  } else if (req.method == "DELETE") {
    let existingUser = await Users.findByIdAndUpdate(req.user._id, {
      is_deleted: true,
    });
    return res.status(200).json({ existingUser });
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
