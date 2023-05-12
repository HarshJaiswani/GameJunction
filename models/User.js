import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      unique: true,
      required: true,
    },
    dob: Date,
    gender: String,
    sports: {
      type: [String],
      required: true,
    },
    is_organiser: {
      type: Boolean,
      required: true,
    },
    is_participant: {
      type: Boolean,
      required: true,
    },
    is_admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile_pic: String, // we have to store image refrence string here
    organiser_points: {
      type: Number,
      default: 0,
    },
    participant_points: {
      type: Number,
      default: 0,
    },
    events_participated: [String],
    events_organised: [String],
    prices_won: [String],
    wishlist_events: [String],
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const Users = mongoose.model("Users", UserSchema);

export default Users;
