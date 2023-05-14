import mongoose from "mongoose";

const TeamParticipantSchema = mongoose.Schema({
  participant_id: {
    type: String,
    required: true,
  },
  is_leader: {
    type: Boolean,
    required: true,
    default: false,
  },
  invite_accepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  invite_rejected: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const TeamSchema = mongoose.Schema(
  {
    team_name: {
      type: String,
      unique: true,
      required: true,
    },
    participants: [TeamParticipantSchema],
    created_by: {
      type: String,
      required: true,
    },
    participations: [String],
    prices_won: [String],
    is_edited: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const Teams = mongoose.model("Teams", TeamSchema);

export default Teams;
