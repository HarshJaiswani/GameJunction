import DeletedUser from "models/DeletedUser";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";
import Verify from "models/Verify";

const handler = async (req, res) => {
  let {
    name,
    contact,
    dob,
    gender,
    sports,
    profile_pic,
    is_organiser,
    is_participant,
    events_participated,
    events_organised,
    prices_won,
  } = req.body;
  if (req.method == "PUT") {
    let existingUser = await Users.findByIdAndUpdate(req.user._id, {
      name,
      contact,
      profile_pic,
      dob,
      gender,
      sports,
      is_organiser,
      is_participant,
      events_participated,
      events_organised,
      prices_won,
    });
    return res.status(200).json({ success: "Profile Updated!" });
  } else if (req.method == "DELETE") {
    await Users.findByIdAndUpdate(req.user._id, {
      is_deleted: true,
    });
    let existingUserObject = await Users.findById(req.user._id);
    let existDeletedUser = await DeletedUser.findOne({
      user_email: existingUserObject.email,
    });
    if (existDeletedUser) {
      await DeletedUser.findOneAndUpdate(
        { user_email: existDeletedUser.email },
        {
          deleted_objects: [
            ...existDeletedUser.deleted_objects,
            existingUserObject,
          ],
        }
      );
    } else {
      let newDeletedUser = new DeletedUser({
        user_email: existingUserObject.email,
        deleted_objects: [existingUserObject],
      });
      await newDeletedUser.save();
    }
    await Users.findByIdAndDelete(req.user._id);
    await Verify.findOneAndDelete({ email: req.user.email });
    return res.status(200).json({ success: "User Deleted!" });
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
