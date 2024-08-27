const Inscription = require("../../models/users/Inscription");
const User = require("../../models/users/User");
//
const { generateOTP } = require("../../../../utils/utils");
const bcrypt = require("bcrypt");
const moment = require("moment");
const uuid = require("uuid");

module.exports = {
  async create(req, res) {
    try {
      const { organization, country } = req.body;
      const { firstname, lastname, username, password, sys_role } = req.body;

      const check_username = await User.findOne({
        where: { username: username.toLowerCase() },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: "The username is not available!",
        });
      }

      var sys_id = uuid.v1();
      const user = await User.create({
        service_id: _service.id,
        role_id: _role.id,
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        username: username.toLowerCase(),
        password,
        is_completed: false,
        sys_role,
        sys_id,
      });

      if (user) {
        return res.status(200).json({
          status: 1,
          message: `Registration process for ${organization.toUpperCase()} has started successfully.`,
          user,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Registration process for ${organization.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "Error on create inscription(registration) ": error });
    }
  },
  async complete(req, res) {
    try {
      const {
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      } = req.body;
      const {
        id,
        firstname,
        lastname,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        nationality,
      } = req.body;

      await User.update(
        {
          firstname,
          lastname,
          gender,
          telephone,
          mail,
          birth,
          birth_location,
          nationality,
          status: 1,
        },
        { where: { id: id } }
      );
      const inscription = await Inscription.create({
        organization_id: orga_id,
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      });

      if (inscription) {
        return res.status(200).json({
          status: 1,
          message: `The registration completion about ${orga_name.toUpperCase()} has done for step 1.`,
          code,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Registration completion for ${orga_name.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "catch error create registration(completion) ": error });
    }
  },
  async activateCompletion(req, res) {
    try {
      const { id, dates, confirmation_code, is_completed } = req.body;

      const findInscription = await Inscription.findOne({
        where: { code: confirmation_code },
      });
      const organization_id = findInscription.organization_id;
      const inscrDates = findInscription.dates;
      const inscrStatus = findInscription.status;

      if (inscrStatus == 1) {
        return res.status(400).json({
          status: 0,
          message: "The confirmation code is already used!",
        });
      }

      var d1 = moment(dates);
      var d2 = moment(inscrDates);
      var duration = moment.duration(d1.diff(d2));
      var minutes = duration.asMinutes();
      const end_date = moment(dates).add("days", 20);

      if (minutes > 10) {
        return res.status(400).json({
          status: 0,
          message: "The confirmation code is experired!",
        });
      }

      if (findInscription) {
        const student = await User.update(
          { is_completed },
          { where: { id: id } }
        );

        const pay = await Payment.create({
          organization_id,
          dates_sub: dates,
          type_sub: "initial",
          package_sub: "Week",
          amount: 0.0,
          currency: "USD",
          reference_transaction: confirmation_code,
          transaction_status: "approved",
          pay_method: "initial",
          end_sub: end_date,
        });

        const _module = await Module.findOne({
          where: { title: "users management" },
        });

        const subs = await Subscription.create({
          module_id: _module.id,
          payment_id: pay.id,
        });

        return res.status(200).json({
          status: 1,
          message: "Account confirmed and activated successfully.",
          student,
        });
      }

      return res.status(400).json({
        status: 0,
        message: "Account confirmation failed.",
      });
    } catch (error) {
      console.log({ "catch error confirmation account ": error });
    }
  },
};
