import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import Events from "../../models/Event";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { userId, eventId } = req.body;

  if (req.method == "POST") {
    let event = await Events.findById(eventId);
    if (event.is_active && !event.is_deleted) {
      let user = await Users.findByIdAndUpdate(userId, {
        events_participated: [...events_participated, eventId],
      });
      let updatedEvent = await Events.findByIdAndUpdate(eventId, {
        participants: [...participants, userId],
      });

      res.status(200).json({ user, updatedEvent });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
