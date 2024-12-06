import React, { useState, useEffect } from "react";
import "./user.css";
import { FaPlus } from "../../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmpty,
  wait,
  validationSchemaUser,
  capitalize,
} from "../../../utils/utils";
import { onGetUsers, onCreateUser, onUpdateUser } from "../../../services/user";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../../components/msgBox/MessageBox";
import moment from "moment";

const User = () => {
  const [onNew, setOnNew] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetUsers(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpUser/getUsers",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const users = useSelector(
    (state) => state.setUserSlice?.initUsers?.usersData
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaUser),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(200);
    //
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    //
    !isUpdating
      ? onCreateUser(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetUsers(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUpUser/getUsers",
                  payload: result,
                });
              });
            }
            const timer = setTimeout(() => {
              setIsShowingMessage(false);
              reset();
            }, 2000);
            return () => {
              clearTimeout(timer);
              isMounted = false;
              isMounted && controller.abort();
            };
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
          })
      : onUpdateUser(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetUsers(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUpUser/getUsers",
                  payload: result,
                });
              });
            }
            const timer = setTimeout(() => {
              setIsShowingMessage(false);
              setOnNew(false);
              reset();
            }, 2000);
            return () => {
              clearTimeout(timer);
              isMounted = false;
              isMounted && controller.abort();
            };
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

  const onUpdate = (item) => {
    setValue("id", item?.id);
    setValue("title", item?.title);
    setValue("type", item?.type);
    setValue("description", item?.description);
  };

  return (
    <div className="users">
      <div className="inner">
        <div className="inner-head">
          <h2 className="title t-2">Utilisateurs</h2>
          <p className="title t-3">
            Gestion des utilisateurs inscrits dans le sytème.
          </p>
        </div>
        <div className="actions">
          {/* <button className="button btn-export">
            <FaFileExport className="icon" /> Exporter
          </button> */}
          <button className="button btn-new" onClick={() => setOnNew(true)}>
            <FaPlus className="icon" /> Nouvel Utilisateur
          </button>
        </div>
        <div className="content">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="col-05 text-align-center">
                    <input type="checkbox" />
                  </th>
                  <th className="col-2 text-align-left">Date Enreg.</th>
                  <th className="col-2 text-align-left">Noms</th>
                  <th className="col-2 text-align-left">E-mail</th>
                  <th className="col-1 text-align-center">Téléphone</th>
                  <th className="col-1 text-align-center">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {isEmpty(users?.data?.users) ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      {users?.data?.message}
                    </td>
                  </tr>
                ) : (
                  users?.data?.users?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="col-05 text-align-center">
                          <input type="checkbox" />
                        </td>
                        <td className="col-2 text-align-left">
                          {moment(item?.createdAt).format("LLLL")}
                        </td>
                        <td className="col-2 text-align-left">
                          {capitalize(item?.firstname)}{" "}
                          {capitalize(item?.lastname)}
                        </td>
                        <td className="col-2 text-align-left">
                          {item?.mail.toLowerCase()}
                        </td>
                        <td className="col-1 text-align-center">
                          {item?.telephone}
                        </td>
                        <td className="col-1 text-align-center">
                          {item?.sys_role}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <div className="p-left">
              <select>
                <option value={5}>5 lignes</option>
                <option value={10}>10 lignes</option>
                <option value={15}>15 lignes</option>
                <option value={20}>20 lignes</option>
              </select>
              <span>1-5 de 50 resultats</span>
            </div>
            <div className="p-right">
              <button className="button btn-previous">Précedent</button>
              <button className="button btn-next">Suivant</button>
            </div>
          </div>
        </div>
      </div>
      {onNew && (
        <div className="outer">
          <div className="wrapper">
            <div className="fp-head">
              <h3 className="title t-2">Nouvel Utilisateur</h3>
              <span
                onClick={() => {
                  setOnNew(false);
                  setIsUpdating(false);
                  reset();
                }}
              >
                &times;
              </span>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              {isShowingMessage && (
                <MessageBox type={message.type} text={message.text} />
              )}
              <div className="row">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("firstname")}
                  />
                  <label htmlFor="firstname" className="label-form">
                    Prénom
                  </label>
                  {errors.firstname && (
                    <span className="fade-in">{errors.firstname.message}</span>
                  )}
                </div>
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("lastname")}
                  />
                  <label htmlFor="lastname" className="label-form">
                    Nom
                  </label>
                  {errors.lastname && (
                    <span className="fade-in">{errors.lastname.message}</span>
                  )}
                </div>
              </div>
              <div className="input-div">
                <select className="input-select" {...register("gender")}>
                  <option value={""} selected>
                    --- Genre ---
                  </option>
                  <option value={"femme"}>Femme</option>
                  <option value={"homme"}>Homme</option>
                </select>
                {errors.gender && (
                  <span className="fade-in">{errors.gender.message}</span>
                )}
              </div>
              <div className="row">
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("telephone")}
                  />
                  <label htmlFor="telephone" className="label-form">
                    Téléphone
                  </label>
                  {errors.telephone && (
                    <span className="fade-in">{errors.telephone.message}</span>
                  )}
                </div>
                <div className="input-div">
                  <input
                    type="text"
                    className="input-form"
                    autoComplete="none"
                    placeholder=" "
                    {...register("mail")}
                  />
                  <label htmlFor="mail" className="label-form">
                    E-mail
                  </label>
                  {errors.mail && (
                    <span className="fade-in">{errors.mail.message}</span>
                  )}
                </div>
              </div>
              <div className="input-div">
                <select className="input-select" {...register("sys_role")}>
                  <option value={""} selected>
                    --- Rôle ---
                  </option>
                  <option value={"admin"}>Admin</option>
                  <option value={"manager"}>Gerant</option>
                  <option value={"seller"}>Vendeur</option>
                </select>
                {errors.sys_role && (
                  <span className="fade-in">{errors.sys_role.message}</span>
                )}
              </div>
              <button type="submit" className="button">
                {isUpdating
                  ? isSending
                    ? "Mise à jour des informations..."
                    : "Mette à Jour"
                  : isSending
                  ? "Enregistrement..."
                  : "Enregistrer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
