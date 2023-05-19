import mongoose from "mongoose";

const VerifySchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: Number,
    token: String,
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const Verify = mongoose.model("Verify", VerifySchema);

export default Verify;
