import React, { useState, useEffect } from "react";
import "./stock.css";
import { FaPlus, BsFilter, FaFileExport } from "../../../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, wait, validationSchemaStock } from "../../../utils/utils";
import { onGetArticles } from "../../../services/configuration";
import {
  onGetStocks,
  onGetStockMovements,
  onCreateStockMovement,
  onUpdateStockMovement,
} from "../../../services/stock";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../../components/msgBox/MessageBox";
import moment from "moment";
import ASSETS from "../../../utils/Assets";

const Stock = () => {
  const [onNew, setOnNew] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isOperation, setIsOperation] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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

    onGetStockMovements(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpStock/getStockMovements",
        payload: result,
      });
    });

    onGetStocks(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpStock/getStocks",
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

  const stockMovements = useSelector(
    (state) => state.setStockSlice?.initStockMovements?.stockMovementsData
  );

  const stocks = useSelector(
    (state) => state.setStockSlice?.initStocks?.stocksData
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaStock),
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
      ? onCreateStockMovement(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetStockMovements(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUpStock/getStockMovements",
                  payload: result,
                });
              });
              //
              onGetStocks(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUpStock/getStocks",
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
      : onUpdateStockMovement(axiosPrivate, data)
          .then((response) => {
            if (response?.data?.status) {
              setIsSending(false);
              setIsShowingMessage(true);
              setMessage({ type: "success", text: response?.data?.message });
              //
              onGetStockMovements(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUpStock/getStockMovements",
                  payload: result,
                });
              });
              //
              onGetStocks(axiosPrivate, signal).then((result) => {
                dispatch({
                  type: "setUpStock/getStocks",
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
    <div className="stocks">
      <div className="inner">
        <div className="inner-head">
          <div className="ih-left">
            <h2 className="title t-2">Stocks</h2>
            <p className="title t-3">
              Gestion des mouvements en stocks, des opérations d'entrées et
              sorties.
            </p>
          </div>
          <div className="ih-right">
            <button
              className={isOperation ? "button active-view" : "button"}
              onClick={() => setIsOperation(true)}
            >
              Opérations
            </button>
            <button
              className={isOperation ? "button" : "button active-view"}
              onClick={() => setIsOperation(false)}
            >
              Stocks
            </button>
          </div>
        </div>
        <div className="actions">
          <div className="left">
            <div className="inputs-form">
              <select>
                <option defaultValue={""}>
                  --- Selectionner un article ---
                </option>
                {isEmpty(articles?.data?.articles) ? (
                  <option
                    value={""}
                    style={{ textAlign: "center", color: "gray" }}
                  >
                    {articles?.data?.message}
                  </option>
                ) : (
                  articles?.data?.articles?.map((item, _) => {
                    return <option value={item?.id} key={item?.id}>{item?.title}</option>;
                  })
                )}
              </select>
            </div>
            <div className="inputs-form">
              <input type="date" placeholder="Recherche" />
            </div>
            <div className="inputs-form">
              <input type="date" placeholder="Recherche" />
            </div>
            <button className="button btn-validate">
              <BsFilter className="icon" /> Filtrer
            </button>
          </div>
          <div className="right">
            <button className="button btn-export">
              <FaFileExport className="icon" /> Exporter
            </button>
            {isOperation && (
              <button className="button btn-new" onClick={() => setOnNew(true)}>
                <FaPlus className="icon" /> Nouvelle Opération
              </button>
            )}
          </div>
        </div>
        <div className="content">
          <div className="table">
            <table>
              <thead>
                {isOperation ? (
                  <>
                    <tr>
                      <th className="col-05 text-align-center">
                        <input type="checkbox" />
                      </th>
                      <th className="col-2 text-align-left">Date Enreg.</th>
                      <th className="col-2 text-align-left">Article</th>
                      <th className="col-2 text-align-left">Opération</th>
                      <th className="col-1 text-align-center">Quantité</th>
                      <th className="col-2 text-align-center">Actions</th>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <th className="col-05 text-align-center">
                        <input type="checkbox" />
                      </th>
                      <th className="col-2 text-align-left">
                        Date Dernière Op.
                      </th>
                      <th className="col-2 text-align-left">Article</th>
                      <th className="col-2 text-align-center">
                        En Stock(Quantité)
                      </th>
                      <th className="col-2 text-align-center">Statut</th>
                    </tr>
                  </>
                )}
              </thead>
              <tbody>
                {isOperation ? (
                  <>
                    {isEmpty(stockMovements?.data?.stockMovements) ? (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ textAlign: "center", color: "gray" }}
                        >
                          {stockMovements?.data?.message}
                        </td>
                      </tr>
                    ) : (
                      stockMovements?.data?.stockMovements?.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="col-05 text-align-center">
                              <input type="checkbox" />
                            </td>
                            <td className="col-2 text-align-left">
                              {moment(item?.dates).format("LLLL")}
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
                                  <h2 className="title t-2">
                                    {item?.article_title}
                                  </h2>
                                  <h3 className="title t-3">
                                    {item?.article_code}
                                  </h3>
                                </div>
                              </div>
                            </td>
                            <td className="col-2 text-align-left">
                              {item?.type}
                            </td>
                            <td className="col-1 text-align-center">
                              {item?.quantity}
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
                              <button className="button btn-action">
                                {item?.status === 1 ? "Annuler" : "Valider"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </>
                ) : (
                  <>
                    {isEmpty(stocks?.data?.articlesStocks) ? (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ textAlign: "center", color: "gray" }}
                        >
                          {stocks?.data?.message}
                        </td>
                      </tr>
                    ) : (
                      stocks?.data?.articlesStocks?.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="col-05 text-align-center">
                              <input type="checkbox" />
                            </td>
                            <td className="col-2 text-align-left">
                              {moment(item?.dates).format("LLLL")}
                            </td>
                            <td className="col-2 text-align-left">
                              <div className="row">
                                <img
                                  src={
                                    item?.article_thumbnail
                                      ? `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/images/${item?.article_thumbnail}`
                                      : ASSETS.logo
                                  }
                                  alt={item?.article_thumbnail}
                                />
                                <div className="content-details">
                                  <h2 className="title t-2">
                                    {item?.article_title}
                                  </h2>
                                  <h3 className="title t-3">
                                    {item?.article_code}
                                  </h3>
                                </div>
                              </div>
                            </td>
                            <td className="col-1 text-align-center">
                              {item?.stockState}
                            </td>
                            <td className="col-1 text-align-center">
                              {item?.stockState === 0 && (
                                <span className="stock-state out-stock">
                                  Stock Epuisé
                                </span>
                              )}
                              {item?.stockState > 0 &&
                                item?.stockState <= item?.article_threshold && (
                                  <span className="stock-state low-stock">
                                    Stock Faible
                                  </span>
                                )}
                              {item?.stockState > item?.article_threshold && (
                                <span className="stock-state in-stock">
                                  Stock Dispoble
                                </span>
                              )}
                              {item?.stockState < 0 && (
                                <span className="stock-state critically-low">
                                  Stock Très Faible
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </>
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
              <h3 className="title t-2">Nouvelle Opération</h3>
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
                <select className="input-select" {...register("article_id")}>
                  <option value={""} selected>
                    --- Selectionner un article ---
                  </option>
                  {isEmpty(articles?.data?.articles) ? (
                    <option
                      value={""}
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      {articles?.data?.message}
                    </option>
                  ) : (
                    articles?.data?.articles?.map((item, _) => {
                      return <option value={item?.id}>{item?.title}</option>;
                    })
                  )}
                </select>
                {errors.article_id && (
                  <span className="fade-in">{errors.article_id.message}</span>
                )}
              </div>
              <div className="input-div">
                <select className="input-select" {...register("type")}>
                  <option value={""} selected>
                    --- Type d'Opération ---
                  </option>
                  <option value={"entrée"}>Entrée en Stock</option>
                  <option value={"sortie"}>Sortie en Stock</option>
                </select>
                {errors.type && (
                  <span className="fade-in">{errors.type.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type="number"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("quantity")}
                />
                <label htmlFor="quantity" className="label-form">
                  Quantitée
                </label>
                {errors.quantity && (
                  <span className="fade-in">{errors.quantity.message}</span>
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

export default Stock;
