const fs = require("fs");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");

const getAllContacts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("PLease Enter User iD");
    }

    let Contacts = await Contact.find({ userId: id }, { contactId: 1 });
    if (!Contacts) {
      throw new Error("No User exist");
    }
    let result = [];
    for (let i = 0; i < Contacts[0]?.contactId?.length; i++) {
      const data = await User.find({ _id: Contacts[0].contactId[i] });
      result.push(...data);
    }

    if (result.length == 0) {
      res.status(200).json({
        success: true,
        user: result,
        message: "No Contacts Exist",
      });
    } else {
      res.status(200).json({
        success: true,
        user: result,
        message: " Contacts Found",
      });
    }

    // if (existingUser.verified) {
    //   Token = Math.floor(Math.random() * 999999999);
    // }
    // if (existingUser?.otp == otp) {
    //   await User.findOneAndUpdate({ number: number }, { verified: true });
    //   if (Token) {
    //     res.status(200).json({
    //       success: true,
    //       user: existingUser,
    //       accessToken: Token,
    //       message: "Verfication successful",
    //     });
    //   } else {
    //     res.status(200).json({
    //       success: true,
    //       message: "Verfication successful",
    //     });
    //   }
    // } else {
    //   throw new Error("PLease Enter Correct Otp");
    // }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Fetch Failed",
      err: err.message,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const { userId, contactId } = req.body;
    if (!userId) {
      throw new Error("PLease Enter User iD");
    }
    if (!contactId) {
      throw new Error("PLease Enter Contact iD");
    }
    let Contacts = await Contact.find({ userId: userId }, { contactId: 1 });
    if (Contacts[0].contactId.length == 0) {
      let contact = new Contact({
        userId: userId,
        contactId: contactId,
        createdAt: new Date(),
      });
      const saved = await contact.save();

      if (!saved) {
        throw new Error("Filaed");
      }
    } else {
      for (let i = 0; i < Contacts[0].contactId.length; i++) {
        if (Contacts[0].contactId[i] == contactId) {
          throw new Error("Contacts Alraedy exist");
        }
      }
      await Contact.findOneAndUpdate(
        { userId: userId },
        { contactId: [...Contacts[0].contactId, contactId] }
      );
    }

    res.status(200).json({
      success: true,
      message: "Contact Saved Success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Fetch Failed",
      err: err.message,
    });
  }
};
module.exports = { getAllContacts, createContact };
