import DeletedUser from "models/DeletedUser";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";
import Verify from "models/Verify";
import Events from "models/Event";
import Teams from "models/Team";

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
    let existingUserObject = await Users.findById(req.user._id);
    let is_deleteable = true;

    for await (let e of existingUserObject.events_participated) {
      let eve = await Events.findById(e);
      if (eve.is_active && !eve.is_deleted) {
        is_deleteable = false;
      }
    }

    if (!is_deleteable) {
      return res
        .status(400)
        .json({ error: "You are participant in an active event!" });
    }

    // deleting all events of the user
    for await (let e of existingUserObject.events_organised) {
      await Events.findByIdAndUpdate(e, {
        is_deleted: true,
        is_active: false,
      });
    }

    // deleting user from the teams
    let all_user_teams = await Teams.find({ is_deleted: false });
    all_user_teams.filter(async (e) => {
      await Teams.findByIdAndUpdate(e._id, {
        participants: e.participants.filter(
          (p) => p.participant_id != req.user.email
        ),
      });
    });

    // updating to update the time of deletiong in updateAt key
    await Users.findByIdAndUpdate(req.user._id, {
      is_deleted: true,
    });

    existingUserObject = await Users.findById(req.user._id);
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

    // deleting user
    await Users.findByIdAndDelete(req.user._id);
    await Verify.findOneAndDelete({ email: req.user.email });

    return res.status(200).json({ success: "User Deleted!" });
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
