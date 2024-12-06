const Newsletter = require("../../models/users/Newsletter");

module.exports = {
  async create(req, res) {
    try {
      const { mail } = req.body;

      const email = mail || null;
      if (email) {
        const check_mail = await Newsletter.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already subscribed!" });
        }
      }

      const subscription = await Newsletter.create({
        mail,
        status: 1,
      });

      if (subscription) {
        return res.status(200).json({
          status: true,
          message: `The newsletter subscription process has been successfully done.`,
          subscription,
        });
      }
    } catch (error) {
      console.log({ "catch error newsletter subscription : ": error });
      return res.status(400).json({
        status: false,
        message: "Newsletter subscription failed.",
      });
    }
  },
  async update(req, res) {
    try {
      const { mail } = req.body;
      const { id } = req.params;

      const onUnSubscription = await Newsletter.update(
        { mail },
        { where: { id: id } }
      );

      if (onUnSubscription) {
        return res.status(200).json({
          status: true,
          message: `${mail.toLowerCase()} has been unsubscribed successfully.`,
          onUnSubscription,
        });
      }
    } catch (error) {
      console.log({ "catch error update User ": error });
      return res.status(400).json({
        status: false,
        message: `The update of ${
          prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
        } ${name.toUpperCase()} failed.`,
        user,
      });
    }
  },
};
