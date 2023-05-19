import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Contacts from "../../models/Contact";
import Users from "../../models/User";

const handler = async (req, res) => {
  let { _id, message } = req.body;

  // finding the current user
  let user = await Users.findOne({ email: req.user.email });

  if (req.method == "GET") {
    // checking if the user is admin or not to return all messages
    if (user.is_admin) {
      let contacts = await Contacts.find({ is_resolved: false });
      return res.status(200).json(contacts);
    } else {
      return res.status(400).json({ error: "Unauthorised Access!" });
    }
  } else if (req.method == "POST") {
    // creating querry
    let newContact = new Contacts({
      userId: req.user._id,
      message,
    });
    await newContact.save();
    return res.status(200).json({ success: "Query Registered!" });
  } else if (req.method == "PUT") {
    // resolving querries
    if (user.is_admin) {
      await Contacts.findByIdAndUpdate(_id, {
        is_resolved: true,
      });
      return res.status(200).json({ success: "Query Succesfully Resolved!" });
    } else {
      return res.status(400).json({ error: "Unauthorised Access!" });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
