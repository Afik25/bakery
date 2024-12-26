import React, { useState, useEffect } from "react";
import "./article.css";
import {
  FaPlus,
  BsSearch,
  BsFilter,
  FaFileExport,
  FaFileImage,
} from "../../../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmpty,
  wait,
  validationSchemaArticle,
} from "../../../../utils/utils";
import {
  onGetArticles,
  onCreateArticle,
  onUpdateArticle,
  onActivationArticle,
  onGetCategories,
} from "../../../../services/configuration";
import useAxiosPrivate from "../../../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../../../components/msgBox/MessageBox";
import moment from "moment";
import swal from "sweetalert";
import ASSETS from "../../../../utils/Assets";

const Article = () => {
  const [onNew, setOnNew] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetArticles(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getArticles",
        payload: result,
      });
    });

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

  const articles = useSelector(
    (state) => state.setInitConf?.initArticles?.articlesData
  );
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
    resolver: yupResolver(validationSchemaArticle),
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
      ? onCreateArticle(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetArticles(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUp/getArticles",
                  payload: result,
                });
              });
              reset();
              setImagePreview("");
              //
            } else {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "warning", text: response?.data?.message });
            }
            const timer = setTimeout(() => {
              setIsShowingMessage(false);
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
      : onUpdateArticle(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetArticles(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUp/getArticles",
                  payload: result,
                });
              });
              //
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
    onActivationArticle(axiosPrivate, data)
      .then((response) => {
        if (response?.data?.status) {
          swal({
            title: "Activation/Desactivation",
            text: response?.data?.message,
            icon: "success",
          });
          //
          onGetArticles(axiosPrivate, signal).then((result) => {
            dispatch({
              type: "setUp/getArticles",
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
    <div className="articles">
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
              <FaPlus className="icon" /> Nouveau
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
                  <th className="col-2 text-align-left">Date Enreg.</th>
                  <th className="col-2 text-align-left">Article</th>
                  <th className="col-2 text-align-left">Catégorie</th>
                  <th className="col-1 text-align-left">Prix Unitaire</th>
                  <th className="col-1 text-align-left">Seuil</th>
                  <th className="col-05 text-align-center">Statut</th>
                  <th className="col-2 text-align-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isEmpty(articles?.data?.articles) ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      {articles?.data?.message}
                    </td>
                  </tr>
                ) : (
                  articles?.data?.articles?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="col-05 text-align-center">
                          <input type="checkbox" />
                        </td>
                        <td className="col-2 text-align-left">
                          {moment(item?.updated_at).format("LLLL")}
                        </td>
                        <td className="col-2 text-align-left">
                          <div className="row">
                            <img
                              src={
                                item?.thumbnail
                                  ? `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${item?.thumbnail}`
                                  : ASSETS.logo
                              }
                              alt={item?.thumbnail}
                            />
                            <div className="content-details">
                              <h2 className="title t-2">{item?.title}</h2>
                              <h3 className="title t-3">{item?.code}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="col-2 text-align-left">
                          {item?.category_title}
                        </td>
                        <td className="col-1 text-align-left">{item?.price}</td>
                        <td className="col-1 text-align-left">
                          {item?.threshold}
                        </td>
                        <td className="col-05 text-align-center">
                          <span
                            className={
                              item?.status === 1
                                ? "status validate"
                                : "status canceled"
                            }
                          >
                            {item?.status === 1 ? "actif(ve)" : "inactif(ve)"}
                          </span>
                        </td>
                        <td className="col-2 text-align-center">
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
            <div className="fp-head">
              <h3 className="title t-2">Nouvel Article</h3>
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
                <select className="input-select" {...register("category_id")}>
                  <option value={""} selected>
                    --- Selectionner la catégorie ---
                  </option>
                  {isEmpty(categories?.data?.categories) ? (
                    <option
                      value={""}
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      {categories?.data?.message}
                    </option>
                  ) : (
                    categories?.data?.categories?.map((item, _) => {
                      return <option value={item?.id}>{item?.title}</option>;
                    })
                  )}
                </select>
                {errors.category_id && (
                  <span className="fade-in">{errors.category_id.message}</span>
                )}
              </div>
              <div className="img-wrapper">
                {imagePreview === "" ? (
                  <FaFileImage className="icon" />
                ) : (
                  <img src={imagePreview} alt="img-view" />
                )}
                <input
                  type="file"
                  className="input-file"
                  {...register("thumbnail", {
                    onChange: (e) =>
                      setImagePreview(URL.createObjectURL(e.target.files[0])),
                  })}
                />
                {imagePreview && (
                  <button
                    className="button"
                    onClick={() => {
                      setImagePreview("");
                      setValue("thumbnail", "");
                    }}
                  >
                    Supprimer la photo
                  </button>
                )}
              </div>
              <div className="input-div">
                <input
                  type="text"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("title")}
                />
                <label htmlFor="title" className="label-form">
                  Libellé Article
                </label>
                {errors.title && (
                  <span className="fade-in">{errors.title.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="number"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("price")}
                />
                <label htmlFor="price" className="label-form">
                  Prix Unitaire
                </label>
                {errors.price && (
                  <span className="fade-in">{errors.price.message}</span>
                )}
              </div>
              <div className="input-div">
                <select className="input-select" {...register("currency")}>
                  <option value={""} selected>
                    --- Selectionner la devise ---
                  </option>
                  <option value={"CDF"}>CDF</option>
                  {/* <option value={"USD"}>USD</option> */}
                </select>
                {errors.currency && (
                  <span className="fade-in">{errors.currency.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="number"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("threshold")}
                />
                <label htmlFor="threshold" className="label-form">
                  Seuil d'Alert
                </label>
                {errors.threshold && (
                  <span className="fade-in">{errors.threshold.message}</span>
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

export default Article;
