import connectDb from "../../middleware/connectDB";
import Events from "../../models/Event";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let events = await Events.find();
    events = events.filter((e) => !e.is_deleted);
    events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.status(200).json(events);
  } else if (req.method == "POST") {
    try {
      let all_events = await Events.find({ is_deleted: false });
      all_events = all_events.filter((e) =>
        req.body.eventids.includes(e._id.toString())
      );
      return res.status(200).json({ all_events });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
