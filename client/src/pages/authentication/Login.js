import React, { useState } from "react";
import "./authentication.css";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { BsEye, BsEyeSlash } from "../../middlewares/icons";
//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLogin, wait } from "../../utils/utils";
//
import { login } from "../../services/authentication";
import useAuth from "../../hooks/context/state/useAuth";
//
import MessageBox from "../../components/msgBox/MessageBox";

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(500);
    //
    login(data)
      .then((response) => {
        if (response?.data?.isLogged) {
          setIsSending(false);
        }
        const accessToken = response?.data?.accessToken;
        const sys_role = response?.data?.sys_role;
        const to = "/" + sys_role;
        setAuth({ sys_role, accessToken });
        navigate(to, { replace: true });
      })
      .catch((error) => {
        setIsSending(false);
        setIsShowingMessage(true);
        if (!error?.response) {
          setMessage({ type: "warning", text: "No server response" });
        } else {
          setMessage({ type: "error", text: error?.response?.data?.message });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
        }, 4000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <div className="sign">
      <div className="container">
        <div className="head">
          <Link to={"/"}>
            <img src={LOGO} alt="logo" />
          </Link>
        </div>
        <h2 className="title t-2">Bienvenue chez MARIATHE!</h2>
        <p className="title t-3">Se connecter</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isShowingMessage && (
            <MessageBox type={message.type} text={message.text} />
          )}
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("mail")}
            />
            <label htmlFor="mail" className="label-form">
              Adresse E-mail
            </label>
            {errors.mail && (
              <span className="fade-in">{errors.mail.message}</span>
            )}
          </div>
          <div className="input-div">
            <input
              type={showPwd ? "text" : "password"}
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("password")}
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
            {errors.password && (
              <span className="fade-in">{errors.password.message}</span>
            )}
          </div>
          <div className="row row-1">
            <Link to={"/forgot"} className="link">
              Mot de passe oublié ?
            </Link>
          </div>
          <button
            type={isSending ? "button" : "submit"}
            className="button normal"
          >
            {isSending ? "Connexion..." : "Se connecter"}
          </button>
          <div className="row row-2">
            <span>Vous n'avez pas un compte ?</span>
            <Link to={"/sign-up"} className="link">
              S'Inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
