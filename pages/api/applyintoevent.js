import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import Events from "../../models/Event";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { eventId, isApplied } = req.body;

  if (req.method == "POST") {
    let event = await Events.findById(eventId);
    if (event.organiserId == req.user._id) {
      res.status(400).json({ error: "You are the organiser!" });
    } else {
      if (!isApplied) {
        if (event.is_active && !event.is_deleted) {
          let user = await Users.findById(req.user._id);
          let newuser = await Users.findByIdAndUpdate(req.user._id, {
            events_participated: [...user.events_participated, eventId],
            participant_points: user.participant_points + 1,
          });
          let points =
            (event.participants + 1) % 10 == 0
              ? (event.participants + 1) / 10
              : 0;
          let org = await Users.findById(event.organiserId);
          await Users.findByIdAndUpdate(event.organiserId, {
            organiser_points: org.organiser_points + points,
          });
          let updatedEvent = await Events.findByIdAndUpdate(eventId, {
            participants: [...event.participants, req.user._id],
          });
          res.status(200).json({ success: "Applied!" });
        } else {
          res.status(400).json({ error: "Cannot Apply!" });
        }
      } else {
        let check = (new Date(event.eventDate) - Date.now()) / (1000 * 60 * 60);
        if (event.is_active && !event.is_deleted && check > 6) {
          let user = await Users.findById(req.user._id);
          let newuser = await Users.findByIdAndUpdate(req.user._id, {
            events_participated: user.events_participated.filter(
              (e) => e != eventId
            ),
            participant_points: user.participant_points - 1,
          });
          let event = await Events.findById(eventId);
          let updatedEvent = await Events.findByIdAndUpdate(eventId, {
            participants: event.participants.filter((e) => e != eventId),
          });
          res.status(200).json({ success: "Withdrawn!" });
        } else {
          res.status(400).json({ error: "Cannot Withdraw!" });
        }
      }
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
