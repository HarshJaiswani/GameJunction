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
      return res.status(200).json({ success: "Added to Wishlist!" });
    } else {
      let newuser = await Users.findByIdAndUpdate(req.user._id, {
        wishlist_events: user.wishlist_events.filter(
          (e) => e.toString() != eventId
        ),
      });
      return res.status(200).json({ success: "Removed from Wishlist!" });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
