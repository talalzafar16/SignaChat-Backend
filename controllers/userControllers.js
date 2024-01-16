const fs = require("fs");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");

const getAllUsers = async (req, res) => {
  try {
    const { value } = req.body;

    const data = await User.find({});
    let result = [];
    if (!value) {
      result = [...data];
    } else {
      for (let i = 0; i < data.length; i++) {
        const numberString = data[i].number.toString();
        if (numberString.startsWith(value.toString())) {
          result.push(data[i]);
        }
      }
    }

    if (result.length == 0) {
      res.status(200).json({
        success: true,
        user: result,
        message: "No User Exist",
      });
    } else {
      res.status(200).json({
        success: true,
        user: result,
        message: " Users Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Fetch Failed",
      err: err.message,
    });
  }
};

module.exports = { getAllUsers };
