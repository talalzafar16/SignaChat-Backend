const fs = require("fs");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const Message = require("../models/message.model");

const getAllContacts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Please Enter User ID");
    }

    let Contacts = await Contact.find({ userId: id }, { contactId: 1 });

    if (!Contacts || Contacts.length === 0) {
      throw new Error("No User exists or no contacts found");
    }

    let result = [];

    for (let i = 0; i < Contacts[0]?.contactId?.length; i++) {
      let data = await User.find({ _id: Contacts[0].contactId[i] });

      const data1 = await Promise.all([
        Message.find({
          $or: [
            { senderId: id, recieverId: Contacts[0].contactId[i] },
            { senderId: Contacts[0].contactId[i], recieverId: id },
          ],
        }),
      ]);

      let results = data1[0].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB;
      });

      let model = {};

      if (results.length > 0) {
        model.content = results[results.length - 1].content;
        model.createdAt = results[results.length - 1].createdAt;
      } else {
        model.content = null;
        model.createdAt = null;
      }

      result.push({ data: data[0], ...model });
    }

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        user: result,
        message: "No Contacts Exist",
      });
    } else {
      res.status(200).json({
        success: true,
        user: result,
        message: "Contacts Found",
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

const createContact = async (req, res) => {
  try {
    const { userId, contactId } = req.body;
    if (!userId) {
      throw new Error("PLease Enter User iD");
    }
    if (!contactId) {
      throw new Error("PLease Enter Contact iD");
    }
    let Contacts = await Contact.find({ userId: userId });
    let Contacts2 = await Contact.find({ userId: contactId });
    console.log(Contacts);
    if (Contacts.length == 0) {
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
      for (let i = 0; i < Contacts[0]?.contactId.length; i++) {
        if (Contacts[0]?.contactId[i] == contactId) {
          throw new Error("Contacts Alraedy exist");
        }
      }
      await Contact.findOneAndUpdate(
        { userId: userId },
        { contactId: [...Contacts[0]?.contactId, contactId] }
      );
    }
    if (Contacts2.length == 0) {
      let contact = new Contact({
        userId: contactId,
        contactId: userId,
        createdAt: new Date(),
      });
      const saved = await contact.save();

      if (!saved) {
        throw new Error("Filaed");
      }
    } else {
      for (let i = 0; i < Contacts2[0]?.contactId.length; i++) {
        if (Contacts2[0]?.contactId[i] == userId) {
          throw new Error("Contacts Alraedy exist");
        }
      }
      await Contact.findOneAndUpdate(
        { userId: contactId },
        { contactId: [...Contacts[0]?.contactId, userId] }
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
