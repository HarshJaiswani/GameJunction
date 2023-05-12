import connectDb from "../../middleware/connectDB";
import Events from "../../models/Event";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let event = await Events.findOne({ slug: req.body.slug });
    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(500).json({ error: "Event not found!" });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
