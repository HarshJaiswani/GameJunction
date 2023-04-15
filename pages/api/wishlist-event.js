import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { eventId } = req.body;

  if (req.method == "POST") {
    let user = await Users.findById(req.user._id);
    if (req.body.toAdd) {
      let newuser = await Users.findByIdAndUpdate(req.user._id, {
        wishlist_events: [...user.wishlist_events, eventId],
      });
      res.status(200).json({ newuser });
    } else {
      let newuser = await Users.findByIdAndUpdate(req.user._id, {
        wishlist_events: user.wishlist_events.filter(
          (e) => e._id.toString() != eventId
        ),
      });
      res.status(200).json({ newuser });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
