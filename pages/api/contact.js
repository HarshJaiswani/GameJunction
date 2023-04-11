import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Contacts from "../../models/Contact";

const handler = async (req, res) => {
  let { _id, userId, message, is_resolved } = req.body;
  if (req.method == "GET") {
    let contacts = await Contacts.find();
    contacts = contacts.filter((c) => !c.is_resolved);
    res.status(200).json({ contacts });
  } else if (req.method == "POST") {
    let newContact = new Contacts({
      userId,
      message,
    });
    await newContact.save();
    res.status(200).json({ newContact });
  } else if (req.method == "PUT") {
    let existingContact = await Contacts.findByIdAndUpdate(_id, {
      userId,
      message,
      is_resolved,
    });
    res.status(200).json({ existingContact });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
