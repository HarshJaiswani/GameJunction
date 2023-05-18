import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Verify from "../../models/Verify";

const handler = async (req, res) => {
  let { email, password, cpassword, token } = req.body;

  if (req.method == "POST") {
    let user = await Users.findOne({ email });
    if (user) {
      if (user.is_deleted) {
        return res.status(500).json({ error: "No User Found" });
      } else {
        let bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRETKEY);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText == password) {
          const senduser = {
            email: user.email,
            _id: user._id,
          };
          let token = jwt.sign({ user: senduser }, process.env.SECRETKEY);
          return res.status(200).json({ authToken: token });
        } else {
          return res.status(500).json({ error: "Invalid Credentials!" });
        }
      }
    } else {
      return res.status(500).json({ error: "No User Found" });
    }
  } else if (req.method == "PUT") {
    if (req.body.sendMail) {
      let user = await Users.findOne({ email });
      if (user) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        let token = jwt.sign({ email }, process.env.SECRETKEY);
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "GameJunction - Forgot Password",
          html: `<div style="text-align: center; font-family: sans-serif;color: #20576b;">
          <p>Greeting!</p>
          <p style="font-size: 1.2rem;">GameJunction</p>
          <p>We hope that you will grow and enjoy with Us!</p>
          <p>Wish you the best for opportunities ahead!</p>
          <p>Your link to change password is: <a style="font-weight: bolder;font-size: 1rem;display: block;" href="${process.env.NEXT_PUBLIC_HOST}/forgot-password?token=${token}">Click Here to reset!</a></p>
          <p>Ignore if you have not requested!</p>
          <p>Team</p>
          <p>GameJunction</p>
        </div>`,
        };
        const success = await new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (err, info) => {
            if (info.response.includes("250")) {
              resolve(true);
            }
            reject(err);
          });
        });
        if (!success) {
          return res.status(500).json({ error: "Error sending email" });
        }
        let verifyCode = await Verify.findOneAndUpdate(
          { email },
          {
            token,
            expiry: Date.now() + 6000000,
          }
        );
        return res.status(200).json({ success: "token sent to mail" });
      } else {
        return res.status(400).json({ error: "No user found!" });
      }
    } else {
      let { email } = jwt.verify(token, process.env.SECRETKEY);
      let verifyCode = await Verify.findOne({ email });
      if (Date.now() <= verifyCode.expiry) {
        let newPass = await Users.findOneAndUpdate(
          { email },
          {
            password: CryptoJS.AES.encrypt(
              cpassword,
              process.env.SECRETKEY
            ).toString(),
          }
        );
        return res.status(200).json({ success: "Password Updated!" });
      } else {
        return res.status(500).json({ error: "Server Timed Out!" });
      }
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
