import connectDb from "../../middleware/connectDB";
import Sports from "../../models/Sport";

const handler = async (req, res) => {
  let { _id, name, resource, playable, is_verified } = req.body;
  if (req.method == "GET") {
    let sports = await Sports.find();
    sports = sports.filter((s) => s.is_verified && !s.is_deleted);
    res.status(200).json({ sports });
  } else if (req.method == "POST") {
    let existSport = await Sports.findOne({ name });
    if (existSport) {
      res.status(500).json({ error: "Sport Already Exist!" });
    } else {
      let newSport = new Sports({
        name,
        resource,
        playable,
      });
      await newSport.save();
      res.status(200).json({ newSport });
    }
  } else if (req.method == "PUT") {
    let existingSport = await Sports.findByIdAndUpdate(_id, {
      name,
      resource,
      playable,
      is_verified,
    });
    res.status(200).json({ existingSport });
  } else if (req.method == "DELETE") {
    let existingSport = await Sports.findByIdAndUpdate(_id, {
      is_deleted: true,
    });
    res.status(200).json({ existingSport });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
