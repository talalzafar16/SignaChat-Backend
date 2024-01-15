const Message = require("../models/message.model");

const reciveMessage = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;
    if (!senderId || !recieverId) {
      throw new Error("Please provide senderId and recieverId");
    }

    const data1 = await Promise.all([
      Message.find({
        $or: [
          { senderId, recieverId },
          { senderId: recieverId, recieverId: senderId },
        ],
      }),
    ]);
    console.log(data1);

    let result = data1[0].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeA - timeB;
    });

    res.status(200).json({
      success: true,
      user: result,
      message: "Success found",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Fetch Failed",
      error: err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderId, recieverId, content } = req.body;
    if (!senderId || !recieverId || !content) {
      throw new Error("PLease Enter Values");
    }
    const mesg = new Message({
      senderId,
      recieverId,
      content,
      createdAt: Date.now(),
    });
    const saved = await mesg.save();
    if (saved) {
      res.status(200).json({
        success: true,
        message: "Successfully Sent",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Message Failed",
      err: err.message,
    });
  }
};

module.exports = { reciveMessage, sendMessage };
