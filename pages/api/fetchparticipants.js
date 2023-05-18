import Teams from "models/Team";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let result = [];
      for (let id of req.body.userids) {
        let user = await Users.findById(id);
        if (user) {
          let dataObj = {
            is_team: false,
            team_name: null,
            team_id: null,
            people: [],
          };
          dataObj.people.push(user);
          result.push(dataObj);
        } else {
          let team = await Teams.findById(id);
          if (team) {
            let teamData = {
              is_team: true,
              team_name: team.team_name,
              team_id: team._id,
              people: [],
            };
            for (let mem of team.participants) {
              let part = await Users.findOne({ email: mem.participant_id });
              if (!part.is_deleted) {
                teamData.people.push(part);
              }
            }
            result.push(teamData);
          }
        }
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
