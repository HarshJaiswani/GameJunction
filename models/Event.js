import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    organiserId: {
      type: String,
      required: true,
    },
    organiserName: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    theme: String,
    details: String,
    category: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    platform: String,
    link: String,
    location: String,
    minTeam: Number,
    maxTeam: Number,
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    rewards: String,
    eligibility: String,
    registrationFee: Number,
    lastDateOfRegistration: {
      type: Date,
      required: true,
    },
    lastTimeOfRegistration: {
      type: String,
      required: true,
    },
    contact: Number,
    email: String,
    website: String,
    youtube: String,
    linkedin: String,
    instagram: String,
    discord: String,
    telegram: String,
    twitter: String,
    other: String,
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
    is_edited: {
      type: Boolean,
      required: true,
      default: true,
    },
    winner: String,
    is_featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    participants: [String],
  },
  { timestamps: true }
);

mongoose.models = {};
const Events = mongoose.model("Events", EventSchema);

export default Events;
