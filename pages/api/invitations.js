import Users from "models/User";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Teams from "models/Team";
import Events from "models/Event";

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

  let team = null;
  let is_user_team_leader = false;
  let has_active_participations = false;
  let person = null;
  if (team_id) {
    team = await Teams.findOne({ _id: team_id, is_deleted: false });

    if (!team) {
      return res.status(400).json({ error: "Team Not Found!" });
    }

    for await (let e of team.participations) {
      let event = await Events.findOne({ _id: e });
      if (event && event.is_active && !event.is_deleted) {
        has_active_participations = true;
      }
    }

    is_user_team_leader = team.participants.filter(
      (e) => e.participant_id == req.user.email
    )[0].is_leader;

    person = team.participants.filter(
      (e) => e.participant_id == participant_id
    )[0];
  }

  if (req.method == "GET") {
    // returning all the current user team invitations
    let invitations = await Teams.find({ is_deleted: false });
    invitations = invitations.filter((e) => {
      let a = e.participants.filter((p) => p.participant_id == req.user.email);
      if (a[0] && !a[0].invite_accepted) {
        return true;
      } else {
        return false;
      }
    });
    return res.status(200).json(invitations);
  } else if (req.method == "POST") {
    // sending invite to participant
    let user = await Users.findOne({ email: participant_id });
    if (team && user) {
      if (!person) {
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
        return res.status(400).json({ error: "Already a memeber!" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Team or Email!" });
    }
  } else if (req.method == "PUT") {
    if (team && !has_active_participations) {
      if (invite_accepted) {
        team.participants.filter(
          (e) => e.participant_id == req.user.email
        )[0].invite_accepted = invite_accepted;
        await team.save();
        return res.status(200).json({ success: "Team Updated!" });
      }
      if (invite_rejected) {
        await Teams.findByIdAndUpdate(team_id, {
          participants: team.participants.filter(
            (e) => e.participant_id != req.user.email
          ),
        });
        return res.status(200).json({ success: "Team Updated!" });
      }
      if (make_leader) {
        if (is_user_team_leader) {
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
        if (is_user_team_leader) {
          await Teams.findByIdAndUpdate(team_id, {
            participants: team.participants.filter(
              (e) => e.participant_id != remove_member
            ),
          });
          return res.status(200).json({ success: "Member Removed!" });
        } else {
          return res.status(400).json({ error: "Unauthorised!" });
        }
      }
      if (leave_team) {
        if (!is_user_team_leader) {
          await Teams.findByIdAndUpdate(team_id, {
            participants: team.participants.filter(
              (e) => e.participant_id != req.user.email
            ),
          });
          return res.status(200).json({ success: "Team Left!" });
        } else {
          return res.status(400).json({ error: "Unauthorised!" });
        }
      }
    } else {
      return res.status(400).json({ error: "Unauthorised!" });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
