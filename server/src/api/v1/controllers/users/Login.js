const User = require("../../models/users/User");
const Login = require("../../models/users/Login");
//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// require("dotenv").config("../../../../../.env");
const { Op } = require("sequelize");

module.exports = {
  async login(req, res) {
    try {
      const {
        mail,
        password,
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      } = req.body;

      const user = await User.findOne({
        where: { mail: mail.toLowerCase() },
      });

      if (!user) {
        return res.status(400).json({
          status: false,
          isLogged: false,
          message: "L'adresse e-mail est incorrecte.",
        });
      }

      const user_status = user.status;
      if (user_status == 0) {
        return res.status(400).json({
          status: false,
          isLogged: false,
          message:
            "Votre compte n'est pas actif. Priere de contacter l'administrateur.",
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          status: false,
          isLogged: false,
          message: "Le mot de passe est incorrect.",
        });
      }
      const user_id = user.id;
      //
      const refreshToken = jwt.sign(
        {
          userInfo: {
            user_id: user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            telephone: user.telephone,
            mail: user.mail,
            sys_role: user.sys_role,
            sys_id: user.sys_id,
            thumbnails: user.thumbnails,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      //
      const login = await Login.create({
        user_id,
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
        refresh_token: refreshToken,
      });
      //
      const accessToken = jwt.sign(
        {
          userInfo: {
            user_id: user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            telephone: user.telephone,
            mail: user.mail,
            sys_role: user.sys_role,
            sys_id: user.sys_id,
            thumbnails: user.thumbnails,
            login: login.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true, // Le cookie ne peut pas être accédé via JavaScript
        secure: process.env.NODE_ENV == "production" ? true : false, // Envoi uniquement sur une connexion HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 jour en millisecondes
        sameSite: process.env.NODE_ENV == "production" ? "Strict" : "None", // Restrict les requêtes inter-domaines
      });

      return res.status(200).json({
        status: true,
        isLogged: true,
        message: "Connexion successfully!",
        accessToken,
        sys_role: user.sys_role,
      });
    } catch (error) {
      console.log({ "Error login user ": error });
      return res.status(400).json({
        status: false,
        message:
          "Error login user: verification de compte utilisateur n'a pas aboutie.",
      });
    }
  },
  async refreshToken(req, res) {
    try {
      const cookies = req?.cookies;
      if (!cookies?.jwt)
        return res
          .status(401)
          .json({ message: "[COOKIES NOT FOUND] : Undefined JWT!" });
      // console.log({ "Cookies verify ": cookies.jwt });

      const refreshToken = cookies?.jwt;
      const connected = await Login.findOne({
        where: { refresh_token: refreshToken },
      });
      // console.log({ "connected user verify ": connected });

      if (!connected) {
        return res.status(400).json({
          status: false,
          isLogged: false,
          message: "This connexion doesn't exists. Unknown token.",
        });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          // console.log({ "connected user verify ": decoded.userInfo });
          if (err || connected.user_id !== decoded.userInfo.user_id)
            return res.sendStatus(403);

          const accessToken = jwt.sign(
            {
              userInfo: {
                user_id: decoded.userInfo.user_id,
                firstname: decoded.userInfo.firstname,
                lastname: decoded.userInfo.lastname,
                gender: decoded.userInfo.gender,
                telephone: decoded.userInfo.telephone,
                mail: decoded.userInfo.mail,
                sys_role: decoded.userInfo.sys_role,
                thumbnails: decoded.userInfo.thumbnails,
                login: decoded.userInfo.login,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30min" }
          );

          const sys_role = decoded.userInfo.sys_role;
          res.status(200).json({ sys_role, accessToken });
        }
      );
    } catch (error) {
      console.log({ "catch error refresh token ": error });
      return res.status(400).json({
        status: false,
        message:
          "Error Refresh Token : Processus de renouvellement de token utilisateur n'a pas aboutie.",
      });
    }
  },
  async logout(req, res) {
    try {
      const { updated_at } = req.query;
      const cookies = req.cookies;

      if (!cookies?.jwt) return res.sendStatus(204); //No content
      const refreshToken = cookies.jwt;

      const connected = await Login.findOne({
        where: { refresh_token: refreshToken },
      });
      console.log({ "connected req?.query": connected });
      if (connected) {
        await Login.update(
          { connection_status: 0 },
          { where: { refresh_token: refreshToken, updated_at: updated_at } }
        );
        console.log({ pass1: "Pass1" });
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        console.log({ pass2: "Pass2" });
        return res.status(204).json({
          status: true,
          isLogged: false,
          message: "Logout process successfully done!",
        });
      }
    } catch (error) {
      console.log({ "catch error logout ": error });
      return res.status(400).json({
        status: false,
        isLogged: false,
        message: "Error Logout Process",
      });
    }
  },
  async changePassword(req, res) {
    try {
      const { old_password, new_password, user_id } = req.body;

      const user = await User.findOne({
        where: { id: user_id },
      });

      if (!bcrypt.compareSync(old_password, user.password)) {
        return res.status(400).json({
          status: false,
          message: "L'ancien mot de passe est invalide.",
        });
      }

      const passwordUpdated = await User.update(
        { password: new_password },
        { where: { id: user_id }, individualHooks: true }
      );

      if (passwordUpdated) {
        return res.status(201).json({
          status: true,
          message: "Votre mot de passe a bien été changé.",
          passwordUpdated,
        });
      }
    } catch (error) {
      console.log({ "catch error changing password ": error });
      return res.status(400).json({
        status: false,
        message: "Processus de changement de mot de passe échoué.",
      });
    }
  },
};
