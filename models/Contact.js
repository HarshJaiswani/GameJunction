import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    is_resolved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const Contacts = mongoose.model("Contacts", ContactSchema);

export default Contacts;
