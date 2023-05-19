import connectDb from "../../middleware/connectDB";
import Sports from "../../models/Sport";

const handler = async (req, res) => {
  let { _id, name, resource, playable, is_verified } = req.body;

  // return all verified sports
  if (req.method == "GET") {
    let sports = await Sports.find({ is_verified: true, is_deleted: false });
    return res.status(200).json(sports);
  } else if (req.method == "POST") {
    // suggest sport
    let existSport = await Sports.findOne({ name });
    if (existSport) {
      return res.status(500).json({ error: "Sport Already Exist!" });
    } else {
      let newSport = new Sports({
        name,
        resource,
        playable,
      });
      await newSport.save();
      return res.status(200).json({ success: "Game Suggested!" });
    }
  } else if (req.method == "PUT") {
    let existingSport = await Sports.findByIdAndUpdate(_id, {
      name,
      resource,
      playable,
      is_verified,
    });
    return res.status(200).json({ success: "Game Verified!" });
  } else if (req.method == "DELETE") {
    let existingSport = await Sports.findByIdAndUpdate(_id, {
      is_deleted: true,
    });
    return res.status(200).json({ success: "Game Deleted!" });
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
