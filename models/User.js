import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

mongoose.models = {};
const Users = mongoose.model("Users", UserSchema);

export default Users;
