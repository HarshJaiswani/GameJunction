import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import Events from "../../models/Event";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { eventId } = req.body;

  if (req.method == "POST") {
    let event = await Events.findById(eventId);
    if (event.organiserId == req.user._id) {
      res.status(400).json({ error: "You are the organiser!" });
    } else {
      if (event.is_active && !event.is_deleted) {
        let user = await Users.findById(req.user._id);
        let newuser = await Users.findByIdAndUpdate(req.user._id, {
          events_participated: [...user.events_participated, eventId],
        });
        let event = await Events.findById(eventId);
        let updatedEvent = await Events.findByIdAndUpdate(eventId, {
          participants: [...event.participants, req.user._id],
        });
        res.status(200).json({ newuser, updatedEvent });
      } else {
        res.status(400).json({ error: "Cannot Apply!" });
      }
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
