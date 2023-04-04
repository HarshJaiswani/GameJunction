import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";

const handler = async (req, res) => {
  let user = await Users.find();
  res.status(200).json({ user });
};

export default connectDb(handler);
