import mongoose from "mongoose";

const SportSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    playable: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    }, // it can either be online or offline
    is_verified: {
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
const Sports = mongoose.model("Sports", SportSchema);

export default Sports;
