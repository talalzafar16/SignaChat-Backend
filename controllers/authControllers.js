const accountSid = "AC0bc6c74521a7f4b7db8c87791389347b";
const authToken = "202b103cfbb7b84ecdc9debe9d4132ad";
const fs = require("fs");
const client = require("twilio")(accountSid, authToken);
const User = require("../models/user.model");

const VerifyOtpController = async (req, res) => {
  try {
    const { number, otp } = req.body;
    if (!otp) {
      throw new Error("PLease Enter Otp");
    }
    if (!number) {
      throw new Error("PLease Enter Number");
    }
    let existingUser = await User.findOne({ number: number });

    let Token;
    if (existingUser.verified) {
      Token = Math.floor(Math.random() * 999999999);
    }
    // if (existingUser?.otp == otp) {
    if (true) {
      await User.findOneAndUpdate({ number: number }, { verified: true });
      if (Token) {
        res.status(200).json({
          success: true,
          user: existingUser,
          accessToken: Token,
          message: "Verfication successful",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Verfication successful",
        });
      }
    } else {
      throw new Error("PLease Enter Correct Otp");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Otp Verifiaction Failed",
      err: err.message,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) {
      throw new Error("Please Enter Number");
    }

    let existingUser = await User.find({ number: number });
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);

    if (existingUser.length > 0) {
      // client.messages;
      // .create({
      //   body: `Your otp verification code is ${generatedOtp} for SignaChat app`,
      //   to: `+${number}`,
      //   from: "+114844834321",
      // })
      // .then(async () => {
      await User.findOneAndUpdate({ number: number }, { otp: generatedOtp });

      res.status(200).json({
        success: true,
        existingUser: true,
        message: "Otp Send To This Phone Number",
      });
      // })
      // .catch((err) => {
      // console.log(err);
      // res.status(400).json({
      //   success: false,
      //   existingUser: true,

      //   message: "Invalid Number",
      //   error: err.message,
      // });
      // });
    } else {
      // client.messages
      //   .create({
      //     body: `Your otp verification code is ${generatedOtp} for SignaChat app`,
      //     to: `+${number}`,
      //     from: "+114844834321",
      //   })
      //   .then(async () => {
      let user = new User({
        number: number,
        name: null,
        gender: null,
        image: null,
        otp: generatedOtp,
        verified: false,
      });

      const saved = await user.save();

      if (saved) {
        res.status(200).json({
          success: true,
          existingUser: false,

          message: "Otp Send To This Phone Number",
        });
      } else {
        throw new Error("Failed to save user");
      }
      // })
      // .catch((err) => {
      //   console.log(err);
      //   res.status(400).json({
      //     success: false,
      //     existingUser: false,

      //     message: "Invalid Number",
      //     error: err.message,
      //   });
      // });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Failed to login",
      error: err.message,
    });
  }
};

const RegitserController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, number, gender } = req.body;
    if (!name) {
      throw new Error("PLease Enter Name");
    }
    if (!number) {
      throw new Error("PLease Enter Number");
    }
    if (!image) {
      throw new Error("PLease Enter Image");
    }
    if (!gender) {
      throw new Error("PLease Enter Gender");
    }
    // const imageData = fs.readFileSync(image);
    const base64Image = image.toString("base64");
    Token = Math.floor(Math.random() * 999999999);

    let user = await User.findOneAndUpdate(
      { number: number },
      {
        name: name,
        image: base64Image,
        gender: gender,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      user: user,
      accessToken: Token,
      message: "Registration Sucess",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Registration Failed",
      err: err.message,
    });
  }
};
module.exports = { VerifyOtpController, LoginController, RegitserController };
