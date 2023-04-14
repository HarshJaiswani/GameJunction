import connectDb from "../../middleware/connectDB";
import Events from "../../models/Event";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let events = await Events.find();
    events = events.filter((e) => !e.is_deleted);
    events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ events });
  } else if (req.method == "POST") {
    try {
      let all_events = [];
      req.body.eventids.forEach(async (e) => {
        let event = await Events.findById(e);
        if (event && !event.is_deleted) {
          all_events.push(event);
        }
      });
      res.status(200).json({ all_events });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
