import connectDb from "../../middleware/connectDB";
import Users from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Verify from "../../models/Verify";
import nodemailer from "nodemailer";

const handler = async (req, res) => {
  let {
    token,
    _id,
    name,
    email,
    password,
    contact,
    dob,
    gender,
    sports,
    profile_pic,
    is_organiser,
    is_participant,
    organiser_rank,
    participant_rank,
    events_participated,
    events_organised,
    prices_won,
    overall_rating,
  } = req.body;
  if (req.method == "GET") {
    let tokenData = jwt.verify(token, process.env.SECRETKEY);
    console.log(tokenData);
    let user = await Users.findOne({ _id: tokenData.user._id });
    if (user.is_deleted) {
      res.status(500).json({ error: "No User Found" });
    } else {
      res.status(200).json({ user });
    }
  } else if (req.method == "POST") {
    if (req.body.sendMail) {
      let existUser = await Users.findOne({ email });
      if (existUser) {
        res.status(500).json({ error: "User already exist!" });
      } else {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        let otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "GAMEJUNCTION - Onboarding",
          html: `<div style="text-align: center; font-family: sans-serif;color: #20576b;">
          <p>We are excited to welcome you onboard!</p>
          <p style="font-size: 1.2rem;">GameJunction</p>
          <p>We hope that you will grow and enjoy with Us!</p>
          <p>Wish you the best for opportunities ahead!</p>
          <p>Your otp for login is: <span style="font-weight: bolder;font-size: 1.5rem;">${otp}</span></p>
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
        let newVerifyCode = new Verify({
          email,
          otp,
          expiry: Date.now() + 6000000,
        });
        await newVerifyCode.save();
        let newUser = new Users({
          name,
          email,
          password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRETKEY
          ).toString(),
          contact,
          profile_pic,
          dob,
          gender,
          sports,
          is_organiser,
          is_participant,
        });
        await newUser.save();
        // let token = jwt.sign({ newUser }, process.env.SECRETKEY).toString();
        // res.status(200).json({ authToken: token });
        res.status(200).json({ message: "Email Sent Successfully!", otp });
      }
    } else {
      let existingUser = await Users.findOne({ email });
      let verifyCode = await Verify.findOne({ email });
      if (Date.now() <= verifyCode.expiry) {
        if (!existingUser.is_email_verified) {
          if (verifyCode.otp === req.body.otp) {
            await Users.findOneAndUpdate(
              { email },
              {
                is_email_verified: true,
              }
            );
            let token = jwt.sign({ existingUser }, process.env.SECRETKEY);
            res
              .status(200)
              .json({ success: "User Created!", authToken: token });
          } else {
            let deletedUser = await Users.findOneAndDelete({ email });
            let deletedCode = await Verify.findOneAndDelete({ email });
            res
              .status(500)
              .json({ error: "Validation Failed!", deletedUser, deletedCode });
          }
        } else {
          res.status(500).json({ error: "User already verified!" });
        }
      } else {
        let deletedUser = await Users.findOneAndDelete({ email });
        res.status(500).json({ error: "Time Out!", deletedUser });
      }
    }
  } else {
    res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(handler);
