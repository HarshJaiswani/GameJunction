import Teams from "models/Team";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Events from "models/Event";

const handler = async (req, res) => {
  let { team_name, team_id } = req.body;
  if (req.method == "GET") {
    let all_teams = await Teams.find({ is_deleted: false });
    all_teams.forEach((e) => {
      let a = e.participants.filter((p) => !p.is_deleted);
      e.participants = a;
    });
    all_teams = all_teams.filter((e) => {
      let p = e.participants.filter(
        (p) => p.participant_id == req.user.email && p.invite_accepted
      );
      if (p[0]) {
        return true;
      } else {
        return false;
      }
    });
    all_teams = all_teams.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json(all_teams);
  } else if (req.method == "POST") {
    let existTeam = await Teams.findOne({ team_name });
    if (existTeam) {
      return res.status(400).json({ error: "Team Name Taken!" });
    } else {
      try {
        let newTeam = await Teams({
          team_name,
          created_by: req.user.email,
          participants: [
            {
              participant_id: req.user.email,
              is_leader: true,
              invite_accepted: true,
            },
          ],
        });
        await newTeam.save();
        return res
          .status(200)
          .json({ success: `Team - ${team_name} Created!` });
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  } else if (req.method == "PUT") {
    let team = await Teams.findOne({ _id: team_id });
    let sameName = await Teams.findOne({ team_name });
    if (sameName) {
      return res.status(400).json({ error: "Team Name Already Exist!" });
    }
    if (team.created_by == req.user.email) {
      await Teams.findOneAndUpdate(
        { _id: team_id },
        {
          team_name,
          is_edited: true,
        }
      );
      return res.status(200).json({ success: "Team Updated!" });
    } else {
      return res.status(400).json({ error: "Unauthorised!" });
    }
  } else if (req.method == "DELETE") {
    let team = await Teams.findOne({ _id: team_id });
    let deleteTeam = true;
    await team.participations.forEach(async (e) => {
      let event = await Events.findOne({ _id: e });
      if (event.is_active) {
        deleteTeam = false;
      }
    });
    if (deleteTeam) {
      if (
        team.participants.filter((e) => e.participant_id == req.user.email)
          .is_leader
      ) {
        await Teams.findOneAndUpdate(
          { _id: team_id },
          {
            is_deleted: true,
          }
        );
        return res.status(200).json({ success: "Team Deleted!" });
      } else {
        return res.status(400).json({ error: "Unauthorised!" });
      }
    } else {
      return res.status(400).json({ error: "You have active participations" });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
