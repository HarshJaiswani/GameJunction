import connectDb from "../../middleware/connectDB";
import Events from "../../models/Event";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let events = await Events.find();
    events = events.filter((e) => !e.is_deleted);
    res.status(200).json({ events });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
