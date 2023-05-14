import Teams from "models/Team";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";

const handler = async (req, res) => {
  let { team_name, team_id } = req.body;
  if (req.method == "GET") {
    let createdTeams = await Teams.find({ created_by: req.user.email });
    createdTeams = createdTeams.filter((e) => !e.is_deleted);
    createdTeams = createdTeams.sort((a, b) => b.createdAt - a.createdAt);

    let participations = await Teams.find();
    participations = participations.filter(
      (e) => e.created_by != req.user.email && !e.is_deleted
    );
    participations = participations.filter((e) => {
      let a = e.participants.filter((p) => p.participant_id == req.user.email);
      if (a[0]) {
        return true;
      } else {
        return false;
      }
    });
    res.status(200).json({ createdTeams, participations });
  } else if (req.method == "POST") {
    let existTeam = await Teams.findOne({ team_name });
    if (existTeam) {
      res.status(400).json({ error: "Team Name Taken!" });
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
        res.status(200).json({ success: `Team - ${team_name} Created!` });
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  } else if (req.method == "PUT") {
    let team = await Teams.findOne({ _id: team_id });
    if (team.created_by == req.user.email) {
      await Teams.findOneAndUpdate(
        { _id: team_id },
        {
          team_name,
          is_edited: true,
        }
      );
      res.status(200).json({ success: "Team Updated!" });
    } else {
      res.status(400).json({ error: "Unauthorised!" });
    }
  } else if (req.method == "DELETE") {
    let team = await Teams.findOne({ _id: team_id });
    if (team.created_by == req.user.email) {
      await Teams.findOneAndUpdate(
        { _id: team_id },
        {
          is_deleted: true,
        }
      );
      res.status(200).json({ success: "Team Deleted!" });
    } else {
      res.status(400).json({ error: "Unauthorised!" });
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
