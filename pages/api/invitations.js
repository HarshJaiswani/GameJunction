import Users from "models/User";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Teams from "models/Team";

const handler = async (req, res) => {
  let {
    team_id,
    participant_id,
    invite_accepted,
    invite_rejected,
    make_leader,
    remove_member,
    leave_team,
  } = req.body;
  if (req.method == "GET") {
    let invitations = await Teams.find({ is_deleted: false });
    invitations = invitations.filter((e) => {
      let a = e.participants.filter((p) => p.participant_id == req.user.email);
      if (a[0] && !a[0].invite_accepted && !a[0].is_deleted) {
        return true;
      } else {
        return false;
      }
    });
    return res.status(200).json(invitations);
  } else if (req.method == "POST") {
    let team = await Teams.findOne({ _id: team_id });
    let user = await Users.findOne({ email: participant_id });
    if (team && user) {
      let is_present = false;
      await team.participants.forEach((e) => {
        if (e.participant_id == participant_id) {
          is_present = true;
        }
      });
      if (!is_present) {
        await Teams.findOneAndUpdate(
          { _id: team_id },
          {
            participants: [
              ...team.participants,
              {
                participant_id,
              },
            ],
          }
        );
        return res.status(200).json({ success: "Invite Sent!" });
      } else {
        let person = team.participants.filter(
          (e) => e.participant_id == participant_id
        )[0];
        if (person.is_deleted) {
          team.participants.filter(
            (e) => e.participant_id == participant_id
          )[0].is_deleted = false;
          team.participants.filter(
            (e) => e.participant_id == participant_id
          )[0].invite_accepted = false;
          team.participants.filter(
            (e) => e.participant_id == participant_id
          )[0].invite_rejected = false;
          team.participants.filter(
            (e) => e.participant_id == participant_id
          )[0].is_leader = false;
          await team.save();
          return res.status(200).json({ success: "Invite Sent!" });
        } else {
          return res.status(400).json({ error: "Already a memeber!" });
        }
      }
    } else {
      return res.status(400).json({ error: "Invalid Team or Email!" });
    }
  } else if (req.method == "PUT") {
    let team = await Teams.findOne({ _id: team_id });
    if (team) {
      if (invite_accepted) {
        team.participants.filter(
          (e) => e.participant_id == req.user.email
        )[0].invite_accepted = invite_accepted;
        await team.save();
        return res.status(200).json({ success: "Team Updated!" });
      }
      if (invite_rejected) {
        team.participants.filter(
          (e) => e.participant_id == req.user.email
        )[0].invite_rejected = invite_rejected;
        team.participants.filter(
          (e) => e.participant_id == req.user.email
        )[0].is_deleted = true;
        await team.save();
        return res.status(200).json({ success: "Team Updated!" });
      }
      if (make_leader) {
        if (
          team.participants.filter((e) => e.is_leader)[0].participant_id ==
          req.user.email
        ) {
          team.participants.filter(
            (e) => e.participant_id == make_leader
          )[0].is_leader = true;
          await team.save();
          team.participants.filter(
            (e) => e.participant_id == req.user.email
          )[0].is_leader = false;
          await team.save();
          return res.status(200).json({ success: "Leader Updated!" });
        } else {
          return res.status(400).json({ error: "Unauthorised!" });
        }
      }
      if (remove_member) {
        if (
          team.participants.filter((e) => e.is_leader)[0].participant_id ==
          req.user.email
        ) {
          team.participants.filter(
            (e) => e.participant_id == remove_member
          )[0].is_deleted = true;
          await team.save();
          return res.status(200).json({ success: "Member Removed!" });
        } else {
          return res.status(400).json({ error: "Unauthorised!" });
        }
      }
      if (leave_team) {
        if (
          team.participants.filter((e) => e.is_leader)[0].participant_id !=
          req.user.email
        ) {
          team.participants.filter(
            (e) => e.participant_id == req.user.email
          )[0].is_deleted = true;
          await team.save();
          return res.status(200).json({ success: "Team Left!" });
        } else {
          return res.status(400).json({ error: "Unauthorised!" });
        }
      }
    } else {
      return res.status(400).json({ error: "Team Not Found!" });
    }
  } else if (req.method == "DELETE") {
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
