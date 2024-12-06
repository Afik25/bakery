import React, { useState } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import {
  capitalize,
  isEmpty,
  wait,
  validationSchemaChangePassword,
} from "../../../../utils/utils";
//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onChangingPassword } from "../../../../services/authentication";
import useAxiosPrivate from "../../../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../../../components/msgBox/MessageBox";

const Profile = () => {
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  const axiosPrivate = useAxiosPrivate();
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaChangePassword),
    defaultValues: {
      user_id: connectedUser?.userInfo?.user_id,
    },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(400);
    //
    onChangingPassword(axiosPrivate, data)
      .then((response) => {
        if (response?.data?.status) {
          setIsSending(false);
          setIsShowingMessage(true);
          setMessage({ type: "success", text: response?.data?.message });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
          reset();
        }, 4000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setIsShowingMessage(true);
        if (!error?.response) {
          setMessage({ type: "warning", text: "No server response" });
        } else {
          setMessage({
            type: "error",
            text: error?.response?.data?.message,
          });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
        }, 4000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <div className="profiles">
      <div className="profile-header">
        <h2 className="title t-2">Mon Profile</h2>
      </div>
      <div className="profile-body">
        <div className="pb-left">
          <div className="column">
            <span className="title t-3">Noms</span>
            <h2 className="title t-2">
              {capitalize(connectedUser?.userInfo?.firstname)}{" "}
              {capitalize(connectedUser?.userInfo?.lastname)}
            </h2>
          </div>
          <div className="column">
            <span className="title t-3">Adresse mail</span>
            <h2 className="title t-2">
              {isEmpty(connectedUser?.userInfo?.mail)
                ? "---"
                : connectedUser?.userInfo?.mail}
            </h2>
          </div>
          <div className="column">
            <span className="title t-3">Numéro de téléphone</span>
            <h2 className="title t-2">
              {isEmpty(connectedUser?.userInfo?.telephone)
                ? "---"
                : connectedUser?.userInfo?.telephone}
            </h2>
          </div>
          <div className="column">
            <span className="title t-3">Type de compte</span>
            <h2 className="title t-2">{connectedUser?.userInfo?.sys_role}</h2>
          </div>
        </div>
        <div className="pb-right">
          <div className="profile-image">
            <img
              src={process.env.PUBLIC_URL + "/user.png"}
              alt="user profile"
            />
            <button className="button">Changer de photo</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title t-2">Changer de Mot de passe</h2>
            {isShowingMessage && (
              <MessageBox type={message.type} text={message.text} />
            )}
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("old_password")}
              />
              <label htmlFor="old_password" className="label-form">
                Ancien mot de passe
              </label>
              {errors.old_password && (
                <span className="fade-in">{errors.old_password.message}</span>
              )}
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("new_password")}
              />
              <label htmlFor="new_password" className="label-form">
                Nouveau mot de passe
              </label>
              {errors.new_password && (
                <span className="fade-in">{errors.new_password.message}</span>
              )}
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("confirm_new_password")}
              />
              <label htmlFor="confirm_new_password" className="label-form">
                Confirmer Nouveau mot de passe
              </label>
              {errors.confirm_new_password && (
                <span className="fade-in">
                  {errors.confirm_new_password.message}
                </span>
              )}
            </div>
            {isSending ? (
              <p>Processus de changement de mot de passe declenché...</p>
            ) : (
              <button type="submit" className="button">
                Changer le mot de passe
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
