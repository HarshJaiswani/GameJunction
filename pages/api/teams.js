import Teams from "models/Team";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Events from "models/Event";

const handler = async (req, res) => {
  let { team_name, team_id } = req.body;

  let team = null;
  let has_active_participations = false;
  let is_user_team_leader = false;
  if (team_id) {
    team = await Teams.findOne({ _id: team_id, is_deleted: false });
    if (!team) {
      return res.status(400).json({ error: "Team Not Found!" });
    }
    await team.participations.forEach(async (e) => {
      let event = await Events.findOne({ _id: e });
      if (event && event.is_active && !event.is_deleted) {
        has_active_participations = true;
      }
    });
    is_user_team_leader = team.participants.filter(
      (e) => e.participant_id == req.user.email
    )[0].is_leader;
  }

  if (req.method == "GET") {
    // fetching all teams
    let all_teams = await Teams.find({ is_deleted: false });
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
    // creating a team
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
    // updating team
    let sameName = await Teams.findOne({ team_name });
    if (sameName) {
      return res.status(400).json({ error: "Team Name Already Exist!" });
    }
    if (team && is_user_team_leader && !has_active_participations) {
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
    if (team && is_user_team_leader && !has_active_participations) {
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
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
