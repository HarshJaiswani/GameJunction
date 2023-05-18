import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import Events from "../../models/Event";
import fetchUser from "../../middleware/fetchUser";
import Teams from "models/Team";

const handler = async (req, res) => {
  let { eventId, isApplied, team_id } = req.body;

  if (req.method == "POST") {
    let event = await Events.findById(eventId);
    if (event.organiserId == req.user._id) {
      return res.status(400).json({ error: "You are the organiser!" });
    } else {
      if (!isApplied) {
        if (event.is_active && !event.is_deleted) {
          let points =
            (event.participants + 1) % 10 == 0
              ? (event.participants + 1) / 10
              : 0;
          let org = await Users.findById(event.organiserId);
          await Users.findByIdAndUpdate(event.organiserId, {
            organiser_points: org.organiser_points + points,
          });
          if (team_id) {
            let participatingTeam = await Teams.findById(team_id);
            if (
              participatingTeam &&
              participatingTeam.participants.filter(
                (e) => e.participant_id == req.user.email
              )[0]?.is_leader
            ) {
              await participatingTeam.participants.forEach(async (p) => {
                if (!p.is_deleted) {
                  let user = await Users.findOne({ email: p.participant_id });
                  if (user.events_participated.includes(eventId)) {
                    return res.status(400).json({ error: "Already Applied!" });
                  }
                }
              });
              await participatingTeam.participants.forEach(async (p) => {
                if (!p.is_deleted) {
                  let user = await Users.findOne({ email: p.participant_id });
                  await Users.findOneAndUpdate(
                    { email: p.participant_id },
                    {
                      events_participated: [
                        ...user.events_participated,
                        eventId,
                      ],
                      participant_points: user.participant_points + 1,
                    }
                  );
                }
              });

              await Events.findByIdAndUpdate(eventId, {
                participants: [...event.participants, team_id],
              });

              await Teams.findByIdAndUpdate(team_id, {
                participations: [...participatingTeam.participations, eventId],
              });

              return res.status(200).json({ success: "Applied!" });
            } else {
              return res.status(400).json({ error: "Team Not Found!" });
            }
          } else {
            let user = await Users.findById(req.user._id);
            if (user.events_participated.includes(eventId)) {
              return res.status(400).json({ error: "Already Applied!" });
            } else {
              await Users.findByIdAndUpdate(req.user._id, {
                events_participated: [...user.events_participated, eventId],
                participant_points: user.participant_points + 1,
              });
              await Events.findByIdAndUpdate(eventId, {
                participants: [...event.participants, req.user._id],
              });
              return res.status(200).json({ success: "Applied!" });
            }
          }
        } else {
          return res.status(400).json({ error: "Cannot Apply!" });
        }
      } else {
        let check = (new Date(event.eventDate) - Date.now()) / (1000 * 60 * 60);
        if (event.is_active && !event.is_deleted && check > 6) {
          if (team_id) {
            let participatingTeam = await Teams.findById(team_id);
            if (
              participatingTeam.participants.filter(
                (e) => e.participant_id == req.user.email
              )[0]?.is_leader
            ) {
              await participatingTeam.participants.forEach(async (e) => {
                let user = await Users.findOne({ email: e.participant_id });
                await Users.findOneAndUpdate(
                  { email: e.participant_id },
                  {
                    events_participated: user.events_participated.filter(
                      (e) => e != eventId
                    ),
                    participant_points: user.participant_points - 1,
                  }
                );
              });
              let event = await Events.findById(eventId);
              await Teams.findByIdAndUpdate(team_id, {
                participations: participatingTeam.participations.filter(
                  (e) => e != eventId
                ),
              });
              await Events.findByIdAndUpdate(eventId, {
                participants: event.participants.filter((e) => e != team_id),
              });
              return res.status(200).json({ success: "Withdrawn!" });
            } else {
              return res.status(400).json({ error: "You are not the leader!" });
            }
          } else {
            let user = await Users.findById(req.user._id);
            await Users.findByIdAndUpdate(req.user._id, {
              events_participated: user.events_participated.filter(
                (e) => e != eventId
              ),
              participant_points: user.participant_points - 1,
            });
            let event = await Events.findById(eventId);
            await Events.findByIdAndUpdate(eventId, {
              participants: event.participants.filter((e) => e != req.user._id),
            });
            return res.status(200).json({ success: "Withdrawn!" });
          }
        } else {
          return res.status(400).json({ error: "Cannot Withdraw!" });
        }
      }
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
