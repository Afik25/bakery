import React, { useState } from "react";
import "./authentication.css";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { BsEye, BsEyeSlash } from "../../middlewares/icons";

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="sign">
      <div className="container">
        <div className="head">
          <Link to={"/"}>
            <img src={LOGO} alt="logo" />
          </Link>
        </div>
        <h2 className="title t-2">Bienvenue chez MARIATHE!</h2>
        <p className="title t-3">S'inscrire</p>
        <form>
          <div className="row row-input">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("username")}
              />
              <label htmlFor="username" className="label-form">
                Prénom
              </label>
              {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("username")}
              />
              <label htmlFor="username" className="label-form">
                Nom
              </label>
              {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
            </div>
          </div>
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("username")}
            />
            <label htmlFor="username" className="label-form">
              Téléphone
            </label>
            {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
          </div>
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              // {...register("username")}
            />
            <label htmlFor="username" className="label-form">
              Adresse E-mail
            </label>
            {/* {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )} */}
          </div>
          <div className="row row-input">
            <div className="input-div">
              <input
                type={showPwd ? "text" : "password"}
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("password")}
              />
              <label htmlFor="password" className="label-form">
                Mot de passe
              </label>
              <label htmlFor="password" className="label-icon">
                {showPwd ? (
                  <BsEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                ) : (
                  <BsEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                )}
              </label>
              {/* {errors.password && (
                <span className="fade-in">{errors.password.message}</span>
              )} */}
            </div>
            <div className="input-div">
              <input
                type={showPwd ? "text" : "password"}
                className="input-form"
                autoComplete="none"
                placeholder=" "
                // {...register("password")}
              />
              <label htmlFor="password" className="label-form">
                Confirmer Mot de passe
              </label>
              <label htmlFor="password" className="label-icon">
                {showPwd ? (
                  <BsEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                ) : (
                  <BsEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                )}
              </label>
              {/* {errors.password && (
                <span className="fade-in">{errors.password.message}</span>
              )} */}
            </div>
          </div>
          <button className="button normal">S'Inscrire</button>
          <div className="row row-2">
            <span>Vous avez déjà un compte ?</span>
            <Link to={"/sign-in"} className="link">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
