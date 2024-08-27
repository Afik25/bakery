import React, { useState, useEffect } from "react";
import "./category.css";
import {
  FaPlus,
  BsSearch,
  BsFilter,
  FaFileExport,
} from "../../../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, wait, validationCategory } from "../../../../utils/utils";
import {
  onGetCategories,
  onCreateCategory,
  onUpdateCategory,
  onActivationCategory,
} from "../../../../services/configuration";
import useAxiosPrivate from "../../../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../../../components/msgBox/MessageBox";
import moment from "moment";
import swal from "sweetalert";

const Category = () => {
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

    onGetCategories(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getCategories",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const categories = useSelector(
    (state) => state.setInitConf?.initCategories?.categoriesData
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationCategory),
    defaultValues: {
      id: "",
    },
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
      ? onCreateCategory(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetCategories(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUp/getCategories",
                  payload: result,
                });
              });
              //
            }else{
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "warning", text: response?.data?.message });
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
      : onUpdateCategory(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetCategories(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUp/getCategories",
                  payload: result,
                });
              });
              //
            }
            const timer = setTimeout(() => {
              setIsShowingMessage(false);
              reset();
            }, 2000);
            return () => {
              clearTimeout(timer);
              isMounted = false;
              isMounted && controller.abort();
              setOnNew(false);
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
    setValue("description", item?.description);
  };

  const onActivation = (status, id) => {
    const data = {
      status: status,
      id: id,
    };
    //
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    //
    onActivationCategory(axiosPrivate, data)
      .then((response) => {
        if (response?.data?.status) {
          swal({
            title: "Activation/Desactivation",
            text: response?.data?.message,
            icon: "success",
          });
          //
          onGetCategories(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUp/getCategories",
              payload: result,
            });
          });
          //
        }
        return () => {
          isMounted = false;
          isMounted && controller.abort();
        };
      })
      .catch((error) => {
        if (!error?.response) {
          swal({
            title: "Activation/Desactivation",
            text: "No server response",
            icon: "error",
          });
        } else {
          swal({
            title: "Activation/Desactivation",
            text: error?.response?.data?.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="categories">
      <div className="inner">
        <div className="actions">
          <div className="left">
            <div className="inputs-form">
              <BsSearch className="icon" />
              <input type="text" placeholder="Recherche" />
            </div>
            <button className="button btn-validate">
              <BsFilter className="icon" /> Filtrer
            </button>
          </div>
          <div className="right">
            <button className="button btn-export">
              <FaFileExport className="icon" /> Exporter
            </button>
            <button className="button btn-new" onClick={() => setOnNew(true)}>
              <FaPlus className="icon" /> Nouvelle
            </button>
          </div>
        </div>
        <div className="content">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="col-05 text-align-center">
                    <input type="checkbox" />
                  </th>
                  <th className="col-1 text-align-left">Date Enreg.</th>
                  <th className="col-3 text-align-left">Intitulé Catégorie</th>
                  <th className="col-2 text-align-left">Description</th>
                  <th className="col-1 text-align-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isEmpty(categories?.data?.categories) ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      {categories?.data?.message}
                    </td>
                  </tr>
                ) : (
                  categories?.data?.categories?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="col-05 text-align-center">
                          <input type="checkbox" />
                        </td>
                        <td className="col-1 text-align-left">
                          {moment(item?.createdAt).format("LLLL")}
                        </td>
                        <td className="col-2 text-align-left">{item?.title}</td>
                        <td className="col-1 text-align-left">
                          {item?.description}
                        </td>
                        <td className="col-1 text-align-center">
                          <button
                            className="button btn-action"
                            onClick={() => {
                              setIsUpdating(true);
                              setOnNew(true);
                              onUpdate(item);
                            }}
                          >
                            Mise à jour
                          </button>
                          <button
                            className="button btn-action"
                            onClick={() => onActivation(item?.status, item?.id)}
                          >
                            {item?.status === 1 ? "Desactiver" : "Activer"}
                          </button>
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
            <div className="d-head">
              <h3 className="title t-2">Nouvelle Catégorie</h3>
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
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("title")}
                />
                <label htmlFor="title" className="label-form">
                  Intitulé Catégorie
                </label>
                {errors.title && (
                  <span className="fade-in">{errors.title.message}</span>
                )}
              </div>
              <div className="input-div">
                <textarea
                  type="text"
                  className="input-textarea"
                  autoComplete="none"
                  placeholder=" "
                  rows={10}
                  {...register("description")}
                />
                <label htmlFor="description" className="label-form">
                  Description
                </label>
                {errors.description && (
                  <span className="fade-in">{errors.description.message}</span>
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

export default Category;
