import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Verify from "../../models/Verify";

const handler = async (req, res) => {
  let { email, password, cpassword } = req.body;

  if (req.method == "POST") {
    let user = await Users.findOne({ email });
    if (user.is_deleted) {
      res.status(500).json({ error: "No User Found" });
    } else {
      let bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRETKEY);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText == password) {
        let token = jwt.sign({ user }, process.env.SECRETKEY);
        res.status(200).json({ authToken: token });
      } else {
        res.status(500).json({ error: "Invalid Credentials!" });
      }
    }
  } else if (req.method == "PUT") {
    if (req.body.sendMail) {
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
        subject: "Sending Test Email",
        html: `<div style="text-align: center; font-family: sans-serif;color: #20576b;">
        <p>We are excited to welcome you onboard!</p>
        <p style="font-size: 1.2rem;">GameJunction</p>
        <p>We hope that you will grow and enjoy with Us!</p>
        <p>Wish you the best for opportunities ahead!</p>
        <p>Your link to change password is: <a style="font-weight: bolder;font-size: 1.5rem;display: block;" href="${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}">Click Here to reset!</a></p>
        <p>Ignore if you have not requested!</p>
        <p>Team</p>
        <p>GameJunction</p>
      </div>`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          console.log("email sent" + info.response);
        }
      });
      let verifyCode = await Verify.findOneAndUpdate(
        { email },
        {
          token,
          expiry: Date.now() + 6000000,
        }
      );
      res.status(200).json({ success: "token sent to mail" });
    } else {
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
        let token = jwt.sign({ newPass }, process.env.SECRETKEY);
        res.status(200).json({ authToken: token });
      } else {
        res.status(500).json({ error: "Server Timed Out!" });
      }
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
