import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Users from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  let { _id, password, cpassword } = req.body;

  if (req.method == "POST") {
    let user = await Users.findById(_id);
    if (!user || user.is_deleted) {
      res.status(500).json({ error: "No User Found" });
    } else {
      let bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRETKEY);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText == password) {
        let newPass = await Users.findByIdAndUpdate(_id, {
          password: CryptoJS.AES.encrypt(
            cpassword,
            process.env.SECRETKEY
          ).toString(),
        });
        let token = jwt.sign({ newPass }, process.env.SECRETKEY);
        res.status(200).json({ authToken: token });
      } else {
        res.status(500).json({ error: "Invalid Credentials!" });
      }
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
