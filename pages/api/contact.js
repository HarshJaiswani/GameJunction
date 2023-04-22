import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Contacts from "../../models/Contact";
import Users from "../../models/User";

const handler = async (req, res) => {
  let user = await Users.findOne({ email: req.user.email });
  let { _id, message, is_resolved } = req.body;
  if (req.method == "GET") {
    if (user.is_admin) {
      let contacts = await Contacts.find();
      contacts = contacts.filter((c) => !c.is_resolved);
      res.status(200).json(contacts);
    } else {
      res.status(400).json({ error: "Unauthorised Access!" });
    }
  } else if (req.method == "POST") {
    let newContact = new Contacts({
      userId: req.user._id,
      message,
    });
    await newContact.save();
    res.status(200).json({ newContact });
  } else if (req.method == "PUT") {
    if (user.is_admin) {
      let existingContact = await Contacts.findByIdAndUpdate(_id, {
        is_resolved,
      });
      res.status(200).json({ existingContact });
    } else {
      res.status(400).json({ error: "Unauthorised Access!" });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
