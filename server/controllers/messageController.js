const Messages = require("../models/messageModel");
const User = require("../models/userModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, people} = req.body;
    console.log("people");
    console.log(people);
    const messages = await Messages.find({
      users: {
        $all: people,
      },
    }).sort({ updatedAt: 1 });
    console.log("messages");
    console.log(messages);
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        sentby:msg.senderName,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, people, message } = req.body;
    const sentby= await User.findOne({
      _id:from
    })
    console.log("sentby");
    console.log(sentby.username);
    const data = await Messages.create({
      message: { text: message },
      users: people,
      senderName:sentby.username,
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
