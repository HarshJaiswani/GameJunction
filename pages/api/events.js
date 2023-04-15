import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Events from "../../models/Event";
import Users from "../../models/User";

const handler = async (req, res) => {
  let {
    _id,
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
    rewards,
    eligibility,
    poster,
    registrationFee,
    lastDateOfRegistration,
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
      let organiserUser = await Users.findOne({ _id: req.user._id });
      let newEvent = new Events({
        organiserId: organiserUser._id,
        organiserName: organiserUser.name,
        title,
        theme,
        details,
        category,
        poster,
        sport,
        mode,
        platform,
        link,
        location,
        minTeam,
        maxTeam,
        eventDate,
        rewards,
        eligibility,
        registrationFee,
        lastDateOfRegistration,
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
      let organiser = await Users.findByIdAndUpdate(req.user._id, {
        events_organised: [...organiserUser.events_organised, newEvent._id],
      });
      res.status(200).json({ success: "Event Created!" });
    }
  } else if (req.method == "PUT") {
    let existingEvent = await Events.findByIdAndUpdate(_id, {
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
      poster,
      eventDate,
      rewards,
      eligibility,
      registrationFee,
      lastDateOfRegistration,
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
