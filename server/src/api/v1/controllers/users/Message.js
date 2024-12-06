const Message = require("../../models/users/Message");

module.exports = {
  async create(req, res) {
    try {
      const { firstname, lastname, subject, message } = req.body;

      const msg = await Message.create({
        firstname,
        lastname,
        subject,
        content: message,
      });

      if (msg) {
        return res.status(200).json({
          status: true,
          message: "Your message has been successfully sent.",
          msg,
        });
      }
    } catch (error) {
      console.log({ "catch error sending message : ": error });
      return res.status(400).json({
        status: false,
        message: "Your message has not been sent.",
      });
    }
  },
  async get(_, res) {
    try {
      const messages = await Message.findAll();
      if (messages == "" || messages == null) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No information available.",
        });
      }

      return res
        .status(200)
        .json({ status: true, length: messages.length, messages });
    } catch (error) {
      console.log({ "catch error get messages ": error });
    }
  },
};
