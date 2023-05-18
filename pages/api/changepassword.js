import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  let { password, cpassword } = req.body;

  if (req.method == "POST") {
    let user = await Users.findById(req.user._id);
    if (!user || user.is_deleted) {
      return res.status(500).json({ error: "No User Found" });
    } else {
      let bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRETKEY);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText == password) {
        let newPass = await Users.findByIdAndUpdate(req.user._id, {
          password: CryptoJS.AES.encrypt(
            cpassword,
            process.env.SECRETKEY
          ).toString(),
        });
        return res.status(200).json({ success: "Password Updated" });
      } else {
        return res.status(500).json({ error: "Invalid Credentials!" });
      }
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
