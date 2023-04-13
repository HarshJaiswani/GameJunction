import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Events from "../../models/Event";
import Users from "../../models/User";

const handler = async (req, res) => {
  let {
    _id,
    organiserId,
    organiserName,
    title,
    theme,
    details,
    category,
    sport,
    mode,
    platform,
    link,
    location,
    minTeam,
    maxTeam,
    eventDate,
    eventTime,
    rewards,
    eligibility,
    registrationFee,
    lastDateOfRegistration,
    lastTimeOfRegistration,
    contact,
    email,
    website,
    youtube,
    linkedin,
    instagram,
    discord,
    telegram,
    twitter,
    other,
    is_active,
    winner,
    is_featured,
  } = req.body;
  if (req.method == "POST") {
    let existEvent = await Events.findOne({ title });
    if (existEvent) {
      res.status(500).json({ error: "Event Title Taken!" });
    } else {
      let newEvent = new Events({
        organiserId,
        organiserName,
        title,
        theme,
        details,
        category,
        sport,
        mode,
        platform,
        link,
        location,
        minTeam,
        maxTeam,
        eventDate,
        eventTime,
        rewards,
        eligibility,
        registrationFee,
        lastDateOfRegistration,
        lastTimeOfRegistration,
        contact,
        email,
        website,
        youtube,
        linkedin,
        instagram,
        discord,
        telegram,
        twitter,
        other,
      });
      await newEvent.save();
      let organiser = await Users.findByIdAndUpdate(organiserId, {
        events_organised: [...events_organised, newEvent._id],
      });
      res.status(200).json({ newEvent, organiser });
    }
  } else if (req.method == "PUT") {
    let existingEvent = await Events.findByIdAndUpdate(_id, {
      organiserId,
      organiserName,
      title,
      theme,
      details,
      category,
      sport,
      mode,
      platform,
      link,
      location,
      minTeam,
      maxTeam,
      eventDate,
      eventTime,
      rewards,
      eligibility,
      registrationFee,
      lastDateOfRegistration,
      lastTimeOfRegistration,
      contact,
      email,
      website,
      youtube,
      linkedin,
      instagram,
      discord,
      telegram,
      twitter,
      other,
      is_active,
      is_featured,
      is_edited: true,
      winner,
    });
    res.status(200).json({ existingEvent });
  } else if (req.method == "DELETE") {
    let existingEvent = await Events.findByIdAndUpdate(_id, {
      is_deleted: true,
    });
    res.status(200).json({ existingEvent });
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
