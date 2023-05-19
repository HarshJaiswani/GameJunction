import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import Events from "../../models/Event";
import fetchUser from "../../middleware/fetchUser";
import Teams from "models/Team";

const handler = async (req, res) => {
  let { eventId, isApplied, team_id } = req.body;

  let event = null;
  let team = null;
  let is_user_leader = false;
  let team_members = [];
  let event_organiser = null;
  if (eventId) {
    event = await Events.findOne({ _id: eventId });
    if (!event || !event.is_active || event.is_deleted) {
      return res.status(400).josn({ error: "Event Not Found!" });
    }
    event_organiser = await Users.findOne({ _id: event.organiserId });
  }
  if (team_id) {
    team = await Teams.findOne({ _id: team_id });
    if (!team || team.is_deleted) {
      return res.status(400).json({ error: "Team Not Found!" });
    }
    await team.participants.forEach((e) => {
      if (e.invite_accepted) {
        team_members.push(e.participant_id);
      }
    });
    is_user_leader = team.participants.filter(
      (e) => e.participant_id == req.user.email
    )[0].is_leader;
  }

  if (req.method == "POST") {
    // checking for the event organiser
    if (
      event.organiserId == req.user._id ||
      team_members.includes(event_organiser.email)
    ) {
      return res.status(400).json({ error: "You are the organiser!" });
    }

    // applying into event
    if (!isApplied) {
      // adding points for organiser
      let points =
        (event.participants + 1) % 10 == 0 ? (event.participants + 1) / 10 : 0;
      await Users.findByIdAndUpdate(event.organiserId, {
        organiser_points: event_organiser.organiser_points + points,
      });

      // team application
      if (team) {
        if (!is_user_leader) {
          return res.status(400).json({ error: "You are not the leader!" });
        }

        if (
          !(
            team_members.length >= event.minTeam &&
            team_members.length <= event.maxTeam
          )
        ) {
          return res.status(400).json({ error: "Team Size Invalid!" });
        }

        await team.participants.forEach(async (p) => {
          let user = await Users.findOne({ email: p.participant_id });
          if (user.events_participated.includes(eventId)) {
            return res.status(400).json({ error: "Already Applied!" });
          }
        });

        await team.participants.forEach(async (p) => {
          let user = await Users.findOne({ email: p.participant_id });
          await Users.findOneAndUpdate(
            { email: p.participant_id },
            {
              events_participated: [...user.events_participated, eventId],
              participant_points: user.participant_points + 1,
            }
          );
        });

        await Events.findByIdAndUpdate(eventId, {
          participants: [...event.participants, team_id],
        });

        await Teams.findByIdAndUpdate(team_id, {
          participations: [...team.participations, eventId],
        });

        return res.status(200).json({ success: "Applied!" });
      }

      // individual application
      if (!team) {
        if (event.minTeam > 1) {
          return res
            .status(400)
            .json({ error: "Individual Application Not Allowed!" });
        }
        let user = await Users.findById(req.user._id);
        if (user.events_participated.includes(eventId)) {
          return res.status(400).json({ error: "Already Applied!" });
        }
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
    // withdrawing from the event
    else {
      let check = (new Date(event.eventDate) - Date.now()) / (1000 * 60 * 60);

      if (check < 6) {
        return res.status(400).json({ error: "Cannot Withdraw!" });
      }

      // withdraw a team
      if (team) {
        if (is_user_leader) {
          await team.participants.forEach(async (e) => {
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
          await Teams.findByIdAndUpdate(team_id, {
            participations: team.participations.filter((e) => e != eventId),
          });
          await Events.findByIdAndUpdate(eventId, {
            participants: event.participants.filter((e) => e != team_id),
          });
          return res.status(200).json({ success: "Withdrawn!" });
        } else {
          return res.status(400).json({ error: "You are not the leader!" });
        }
      }

      // withdraw individual
      let user = await Users.findById(req.user._id);
      await Users.findByIdAndUpdate(req.user._id, {
        events_participated: user.events_participated.filter(
          (e) => e != eventId
        ),
        participant_points: user.participant_points - 1,
      });
      await Events.findByIdAndUpdate(eventId, {
        participants: event.participants.filter((e) => e != req.user._id),
      });
      return res.status(200).json({ success: "Withdrawn!" });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
