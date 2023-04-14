import connectDb from "../../middleware/connectDB";
import Events from "../../models/Event";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body.eventid);
    let event = await Events.findById({ _id: req.body.eventid });
    res.status(200).json({ event });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
