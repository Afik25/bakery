const User = require("../../models/users/User");
const Inscription = require("../../models/users/Inscription");
const { Op } = require("sequelize");
const uuid = require("uuid");
const { generatePassword, generateOTP } = require("../../../../utils/utils");

module.exports = {
  async create(req, res) {
    try {
      const { firstname, lastname, gender, telephone, mail, sys_role } =
        req.body;

      const phone = telephone || null;
      if (phone) {
        const check_phone = await User.findOne({
          where: {
            telephone: {
              [Op.like]: `%${telephone.toString()}%`,
            },
          },
        });
        if (check_phone) {
          return res
            .status(400)
            .json({ status: 0, message: "The phone number is already used!" });
        }
      }

      const email = mail || null;
      if (email) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already used!" });
        }
      }

      // const password = generatePassword(6);
      const user = await User.create({
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        gender,
        telephone,
        mail: mail.toLowerCase(),
        sys_role,
        password: "mariathe",
      });

      if (user) {
        return res.status(200).json({
          status: true,
          message: `The registration of ${
            firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase()
          } ${lastname.toUpperCase()} has been successfully done. The password is ${"password"}`,
          user,
        });
      }
    } catch (error) {
      console.log({ "catch error create User : ": error });
      return res.status(400).json({
        status: false,
        message: `The User registration process failed.`,
      });
    }
  },
  async get(req, res) {
    try {
      const users = await User.findAll();
      if (users == "" || users == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available.",
        });
      }

      return res.status(200).json({ status: 1, length: users.length, users });
    } catch (error) {
      console.log({ "catch error get Users ": error });
    }
  },
  async getByKeys(req, res) {
    try {
      const { users_page, users_rows } = req.params;

      // Calculate offset
      const offset = (parseInt(users_page) - 1) * parseInt(users_rows);

      // Retreive orders with pagination
      const { rows, count } = await User.findAndCountAll({
        limit: parseInt(users_rows), // Limite du nombre d'éléments par page
        offset: offset, // Décalage (offset) des résultats
        order: [["firstname", "ASC"]], // created_at / updated_at
      });

      if (rows == "" || rows == null) {
        return res.status(200).json({
          status: true,
          length: 0,
          message: "No information available.",
        });
      }

      const usersSorted = rows.sort(function (a, b) {
        if (a.firstname < b.firstname) {
          return -1;
        }
      });
      const users = usersSorted;

      // Nombre total de pages
      const totalPages = Math.ceil(count / users_rows);

      return res.status(200).json({
        status: true,
        length: users.length,
        users: users, // Les résultats de la page demandée
        totalUsers: count, // Nombre total de categories
        totalPages: totalPages, // Nombre total de pages
        currentPage: users_page, // Page actuelle
        users_rows: users_rows, // Taille de la page
      });
    } catch (error) {
      console.log({ "catch error get Users ": error });
      return res
        .status(400)
        .json({ status: false, message: "catch error get Users" });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const user = await User.findAll({ where: { id: key } });
      if (!user) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `No information available.`,
        });
      }

      return res.status(200).json({ status: true, length: user.length, user });
    } catch (error) {
      console.log({ "catch error get User by key ": error });
    }
  },
  async update(req, res) {
    try {
      const { id, firstname, lastname, gender, telephone, mail, sys_role } =
        req.body;

      const user = await User.update(
        {
          firstname,
          lastname,
          gender,
          telephone,
          mail,
          sys_role,
        },
        { where: { id: id } }
      );

      if (user) {
        return res.status(200).json({
          status: true,
          message: `The user update process of ${
            firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase()
          } ${lastname.toUpperCase()} has been successfully done.`,
          user,
        });
      }
    } catch (error) {
      console.log({ "catch error update User ": error });
      return res.status(400).json({
        status: false,
        message: `The user update process failed.`,
      });
    }
  },
  async activation(req, res) {
    try {
      const { id, status } = req.params;

      const user = await User.update(
        { status: status == 1 ? 0 : 1 },
        { where: { id: id } }
      );

      if (user) {
        return res.status(200).json({
          status: true,
          message: `The account ${
            status == 1 ? "desactivation" : "activation"
          } process has been successfully done.`,
          user,
        });
      }
    } catch (error) {
      console.log({ "catch error update User ": error });
      return res.status(400).json({
        status: false,
        message: `The account Activation/Desactivation process failed.`,
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ status: 1, message: "The user has been deleted." });
    } catch (error) {
      console.log({ "catch error delete User ": error });
    }
  },
  async rootConfigure(req, res) {
    try {
      // Initial configurations
      // User information
      //
      const firstname = "admin";
      const lastname = "admin";
      const mail = "admin@mariathe.com";
      const password = "@dmin";
      const sys_role = "admin";

      const check_mail = await User.findOne({ where: { mail: mail } });
      if (check_mail) {
        return res
          .status(200)
          .json({ status: true, message: "The root is already configured." });
      }
      //
      var sys_id = uuid.v1();
      const user = await User.create({
        firstname,
        lastname,
        mail,
        password,
        sys_role,
        sys_id,
      });

      if (user) {
        const dates = new Date();
        const inscription = await Inscription.create({
          user_id: user.id,
          dates,
          location: "N/A",
          latitude: "N/A",
          longitude: "N/A",
          device: "N/A",
          ip_address: "N/A",
          operating_system: "N/A",
          navigator: "N/A",
        });
        if (inscription) {
          return res.status(201).json({
            status: true,
            message: "The root setup process have successfully done.",
            user,
            inscription,
          });
        }
      }

      return res.status(400).json({
        status: false,
        message: "The root setup process has failed.",
      });
    } catch (error) {
      console.log({ "Error root configure process ": error });
      return res.status(400).json({
        status: false,
        message: "Error root configure process.",
        error,
      });
    }
  },
};
