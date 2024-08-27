import React, { useState, useEffect } from "react";
import "./orders.css";
import {
  FaPlus,
  FaFileExport,
  MdOutlineCancel,
  GrValidate,
  BsFilter,
  BsSearch,
  FaTrashAlt,
  FaEdit,
} from "../../../middlewares/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmpty,
  wait,
  validationSchemaOnAddToBasket,
  validationSchemaOrder,
} from "../../../utils/utils";
import { onGetArticles } from "../../../services/configuration";
import { onGetStocksByArticleId } from "../../../services/stock";
import { onCreateOrder, onGetOrders } from "../../../services/order";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../../components/msgBox/MessageBox";
import moment from "moment";
import ASSETS from "../../../utils/Assets";
//
import "moment/locale/fr";
moment.locale("fr");

const Orders = () => {
  const [onNew, setOnNew] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [articleStockState, setArticleStockState] = useState("");
  const [basket, setBasket] = useState([]);
  const [netPayable, setNetPayable] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isArticleDiscount, setIsArticleDiscount] = useState("percent");
  const [discountAmount, setDiscountAmount] = useState(0.0);
  const [isOrderDiscount, setIsOrderDiscount] = useState("percent");
  const [discountOrderAmount, setDiscountOrderAmount] = useState(0.0);

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

    onGetOrders(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUpOrder/getOrders",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  const articles = useSelector(
    (state) => state.setInitConf?.initArticles?.articlesData
  );

  const orders = useSelector(
    (state) => state.setOrderSlice?.initOrders?.ordersData
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaOnAddToBasket),
    defaultValues: {
      article_title: "",
      article_code: "",
      article_price: "",
      article_currency: "",
      article_threshold: "",
      discount: 0,
      discount_type: "percent",
    },
  });

  const onAddToBasket = async (data) => {
    let checkArticle = basket.filter(
      (item, _) => item?.article_title === data?.article_title
    );
    if (checkArticle.length === 0) {
      setBasket([
        ...basket,
        {
          article_id: data?.article_id,
          article_code: data?.article_code,
          article_title: data?.article_title,
          article_price: data?.article_price,
          article_currency: data?.article_currency,
          article_quantity: data?.quantity,
          discount: data?.discount,
          discount_type: data?.discount_type,
          pay_from_discount:
            data?.article_price - (data?.discount / 100) * data?.article_price,
          total_price:
            data?.discount_type === "percent"
              ? (data?.article_price -
                  (data?.discount / 100) * data?.article_price) *
                data?.quantity
              : (data?.article_price - data?.discount) * data?.quantity,
        },
      ]);
      setDiscountAmount(0);
      setTotalQuantity((prev) => prev + data?.quantity);
      setNetPayable((prev) => prev + data?.quantity * data?.article_price);
      reset();
    } else {
      setIsShowingMessage(true);
      setMessage({
        type: "info",
        text: "L'article existe déjà dans le penier",
      });
      const timer = setTimeout(() => {
        setIsShowingMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const onUpdate = (item, i) => {
    setValue("article_id", item?.article_id);
    setValue("article_code", item?.article_code);
    setValue("article_title", item?.article_title);
    setValue("article_price", item?.article_price);
    setValue("article_currency", item?.article_currency);
    setValue("quantity", item?.article_quantity);
    setValue("discount", item?.discount);
    //
    setBasket((prevState) => {
      const newBaskets = [...prevState];
      newBaskets.splice(i, 1);
      return newBaskets;
    });
  };

  const onRemove = (i) => {
    setBasket((prevState) => {
      const newBaskets = [...prevState];
      newBaskets.splice(i, 1);
      return newBaskets;
    });
  };

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    getValues: getValues2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaOrder),
    defaultValues: {
      user_id: connectedUser?.userInfo?.user_id,
      order_dates: "",
      order_discount: 0,
      order_discount_type: isOrderDiscount,
      order_pay_mode: "",
      order_status: "",
      customer: "Anonyme",
    },
  });

  const onSubmit = async (data) => {
    let _totalAmount = 0;
    for (let i = 0; i < basket.length; i++) {
      const element = basket[i];
      _totalAmount +=
        parseInt(element?.article_price) * parseInt(element?.article_quantity);
    }
    const _netPayable =
      data?.order_discount_type === "percent"
        ? _totalAmount - (parseInt(data?.order_discount) / 100) * _totalAmount
        : _totalAmount - parseInt(data?.order_discount);
    const _data = {
      user_id: data?.user_id,
      order_dates: data?.order_dates,
      order_quantity: totalQuantity,
      order_discount: data?.order_discount,
      order_discount_type: data?.order_discount_type,
      order_pay_from_discount: _netPayable,
      order_pay_mode: data?.order_pay_mode,
      order_status: data?.order_status,
      customer: data?.customer,
      order_details: basket,
    };
    //
    setIsSending(true);
    await wait(200);
    //
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    //
    onCreateOrder(axiosPrivate, _data)
      .then((response) => {
        if (response?.data?.status) {
          setIsSending(false);
          setIsShowingMessage(true);
          setMessage({ type: "success", text: response?.data?.message });
        }
        //
        onGetOrders(axiosPrivate, signal).then((result) => {
          dispatch({
            type: "setUpOrder/getOrders",
            payload: result,
          });
        });
        //
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
          reset();
          reset2();
          setArticleStockState("");
          setNetPayable(0);
          setBasket([]);
          setIsFirstStep(true);
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

  return (
    <div className="orders">
      <div className="inner">
        <h2 className="title t-1">
          Commande <span>({orders?.data?.orders?.length} commandes)</span>
        </h2>
        <div className="actions">
          <div className="left">
            <div className="inputs-form">
              <BsSearch className="icon" />
              <input type="text" placeholder="Recherche" />
            </div>
            <button className="button btn-validate">
              <BsFilter className="icon" /> Filtrer
            </button>
            <select>
              <option value={""}>Statut commande</option>
              <option value={"validate"}>Validée</option>
              <option value={"pending"}>En attente</option>
              <option value={"canceled"}>Annulée</option>
            </select>
          </div>
          <div className="right">
            <button className="button btn-validate">
              <GrValidate className="icon" /> Valider
            </button>
            <button className="button btn-canceled">
              <MdOutlineCancel className="icon" /> Annuler
            </button>
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
                  <th className="col-2 text-align-left">Date</th>
                  <th className="col-1 text-align-left">Numéro Commande</th>
                  <th className="col-3 text-align-left">Client</th>
                  <th className="col-1 text-align-center">Nombre d'articles</th>
                  <th className="col-05 text-align-center">Quantité</th>
                  <th className="col-1 text-align-center">Total (CDF)</th>
                  <th className="col-05 text-align-center">Statut</th>
                  <th className="col-1 text-align-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isEmpty(orders?.data?.orders) ? (
                  <tr>
                    <td
                      colSpan={9}
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      {orders?.data?.message}
                    </td>
                  </tr>
                ) : (
                  orders?.data?.orders?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="col-05 text-align-center">
                          <input type="checkbox" />
                        </td>
                        <td className="col-2 text-align-left">
                          {moment(item?.dates).format("LLLL")}
                        </td>
                        <td className="col-1 text-align-left">{item?.code}</td>
                        <td className="col-3 text-align-left">
                          {item?.customer}
                        </td>
                        <td className="col-1 text-align-center">
                          {item?.detailsOrder.length}
                        </td>
                        <td className="col-05 text-align-center">
                          {item?.total_quantity}
                        </td>
                        <td className="col-1 text-align-center">
                          {parseInt(item?.pay_from_discount).toFixed(2)}
                        </td>
                        <td className="col-05 text-align-center">
                          {item?.status === "delivered" && (
                            <span className="status completed">Livrée</span>
                          )}
                          {item?.status === "approved" && (
                            <span className="status validate">Approuvée</span>
                          )}
                          {item?.status === "canceled" && (
                            <span className="status canceled">Annulée</span>
                          )}
                          {item?.status === "pending" && (
                            <span className="status pending">En attente</span>
                          )}
                        </td>
                        <td className="col-1 text-align-center">
                          <button
                            className="button btn-action"
                            onClick={() =>
                              navigate(`/admin/orders/${item?.code}/details`, {
                                state: {
                                  item: item,
                                },
                              })
                            }
                          >
                            Details
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
            <div className="o-head">
              <h3 className="title t-2">Nouvelle Commande/Vente</h3>
              <span
                onClick={() => {
                  setOnNew(false);
                  // setIsUpdating(false);
                  // reset();
                }}
              >
                &times;
              </span>
            </div>
            <hr />
            <div className="o-body">
              {isFirstStep && (
                <>
                  <form
                    key={1}
                    className="o-up"
                    onSubmit={handleSubmit(onAddToBasket)}
                  >
                    <div className="details">
                      {isShowingMessage && (
                        <MessageBox type={message.type} text={message.text} />
                      )}
                      <div className="input-div">
                        <select
                          className="input-select"
                          {...register("article_id", {
                            onChange: (e) => {
                              // console.log({ "e.target.value": e.target.value });
                              let index = e.nativeEvent.target.selectedIndex;
                              let article_title =
                                e.nativeEvent.target[index].text;
                              let article_code =
                                e.nativeEvent.target[index].dataset.code;
                              let article_price =
                                e.nativeEvent.target[index].dataset.price;
                              let article_currency =
                                e.nativeEvent.target[index].dataset.currency;
                              let article_threshold =
                                e.nativeEvent.target[index].dataset.threshold;
                              //
                              setValue("article_title", article_title);
                              setValue("article_code", article_code);
                              setValue("article_price", article_price);
                              setValue("article_currency", article_currency);
                              setValue("article_threshold", article_threshold);
                              //
                              let isMounted = true;
                              const controller = new AbortController();
                              const signal = controller.signal;

                              onGetStocksByArticleId(
                                axiosPrivate,
                                signal,
                                e.target.value
                              ).then((result) => {
                                setArticleStockState(result?.data?.stockState);
                              });

                              return () => {
                                isMounted = false;
                                isMounted && controller.abort();
                              };
                            },
                          })}
                        >
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
                              return (
                                <option
                                  value={item?.id}
                                  data-code={item?.code}
                                  data-price={item?.price}
                                  data-currency={item?.currency}
                                  data-threshold={item?.threshold}
                                >
                                  {item?.title}
                                </option>
                              );
                            })
                          )}
                        </select>
                        {errors.article_id && (
                          <span className="fade-in">
                            {errors.article_id.message}
                          </span>
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
                          <span className="fade-in">
                            {errors.quantity.message}
                          </span>
                        )}
                      </div>
                      <div className="input-div">
                        <input
                          type="number"
                          className="input-form"
                          autoComplete="none"
                          placeholder=" "
                          {...register("discount")}
                        />
                        <label htmlFor="discount" className="label-form">
                          Remise
                        </label>
                        {errors.discount && (
                          <span className="fade-in">
                            {errors.discount.message}
                          </span>
                        )}
                      </div>
                      <div className="input-div discount">
                        <button
                          type="button"
                          className={
                            isArticleDiscount === "percent"
                              ? "discount-btn discount-selected"
                              : "discount-btn"
                          }
                          onClick={() => {
                            setValue("discount_type", "percent");
                            const art_price = parseFloat(
                              getValues("article_price")
                            );
                            const disc = parseInt(getValues("discount"));
                            //
                            const rs = isNaN(art_price)
                              ? 0
                              : art_price - (disc / 100) * art_price;
                            setDiscountAmount(rs);
                            //
                            setIsArticleDiscount("percent");
                          }}
                        >
                          Remise en Pourcentage
                        </button>
                        <button
                          type="button"
                          className={
                            isArticleDiscount === "amount"
                              ? "discount-btn discount-selected"
                              : "discount-btn"
                          }
                          onClick={() => {
                            setValue("discount_type", "amount");
                            const art_price = parseFloat(
                              getValues("article_price")
                            );
                            const disc = parseInt(getValues("discount"));
                            //
                            const rs = isNaN(art_price) ? 0 : art_price - disc;
                            setDiscountAmount(rs);
                            //
                            setIsArticleDiscount("amount");
                          }}
                        >
                          Remise en Montant
                        </button>
                        <span className="discount-amount">
                          {discountAmount} CDF
                        </span>
                      </div>
                      <button type="submit" className="button">
                        Ajouter
                      </button>
                    </div>
                    <div className="stock-state">
                      <p className="title t-3">Stock Actuel</p>
                      <span>{articleStockState} PCS</span>
                    </div>
                  </form>
                  <hr />
                </>
              )}
              <div className="o-down">
                <div className="o-down-head">
                  <h3 className="title t-2">
                    {isFirstStep
                      ? "Situation dans le Panier"
                      : "Validation de la commande/vente"}
                  </h3>
                  <button
                    className="step-btn"
                    onClick={() => {
                      {
                        isFirstStep && basket.length > 0
                          ? setIsFirstStep(false)
                          : setIsFirstStep(true);
                      }
                    }}
                  >
                    {isFirstStep ? "Suivant" : "Précedent"}
                  </button>
                </div>
                {isFirstStep ? (
                  <div className="table">
                    <table>
                      <thead>
                        <tr>
                          <th className="col-2 text-align-left">Article</th>
                          <th className="col-1 text-align-center">Quantité</th>
                          <th className="col-2 text-align-center">
                            Prix Unitaire (CDF)
                          </th>
                          <th className="col-1 text-align-center">Remise</th>
                          <th className="col-1 text-align-center">
                            A payer (CDF)
                          </th>
                          <th className="col-2 text-align-center">
                            Prix Total (CDF)
                          </th>
                          <th className="col-2 text-align-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isEmpty(basket) ? (
                          <tr>
                            <td
                              colSpan={6}
                              style={{ textAlign: "center", color: "gray" }}
                            >
                              Votre panier est encore vide!
                            </td>
                          </tr>
                        ) : (
                          basket.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td className="col-2 text-align-left">
                                  {item?.article_title}
                                </td>
                                <td className="col-1 text-align-center">
                                  {item?.article_quantity}
                                </td>
                                <td className="col-2 text-align-center">
                                  {parseInt(item?.article_price).toFixed(2)}
                                </td>
                                <td className="col-1 text-align-center">
                                  {item?.discount}
                                  {item?.discount_type === "percent"
                                    ? " %"
                                    : " CDF"}
                                </td>
                                <td className="col-1 text-align-center">
                                  {parseInt(item?.pay_from_discount).toFixed(2)}
                                </td>
                                <td className="col-2 text-align-center">
                                  {parseInt(item?.total_price).toFixed(2)}
                                </td>
                                <td className="col-2 text-align-center">
                                  <button
                                    className="button"
                                    onClick={() => onUpdate(item, idx)}
                                  >
                                    <FaEdit className="icon" />
                                  </button>
                                  <button
                                    className="button"
                                    onClick={() => onRemove(idx)}
                                  >
                                    <FaTrashAlt className="icon" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <form
                    key={2}
                    className="o-down-next"
                    onSubmit={handleSubmit2(onSubmit)}
                  >
                    <div style={{ width: "100%" }}>
                      {isShowingMessage && (
                        <MessageBox type={message.type} text={message.text} />
                      )}
                    </div>
                    <div className="input-div">
                      <input
                        type="number"
                        className="input-form"
                        autoComplete="none"
                        placeholder=" "
                        {...register2("order_discount")}
                      />
                      <label htmlFor="order_discount" className="label-form">
                        Remise
                      </label>
                      {errors2.order_discount && (
                        <span className="fade-in">
                          {errors2.order_discount.message}
                        </span>
                      )}
                    </div>
                    <div className="input-div discount">
                      <button
                        type="button"
                        className={
                          isOrderDiscount === "percent"
                            ? "discount-btn discount-selected"
                            : "discount-btn"
                        }
                        onClick={() => {
                          setValue2("order_discount_type", "percent");
                          let _totalAmount = 0;
                          for (let i = 0; i < basket.length; i++) {
                            const element = basket[i];
                            _totalAmount +=
                              parseInt(element?.article_price) *
                              parseInt(element?.article_quantity);
                          }
                          const disc = parseInt(getValues2("order_discount"));
                          //
                          const rs = _totalAmount - (disc / 100) * _totalAmount;
                          setDiscountOrderAmount(rs);
                          setNetPayable(rs);
                          //
                          setIsOrderDiscount("percent");
                        }}
                      >
                        Remise en Pourcentage
                      </button>
                      <button
                        type="button"
                        className={
                          isOrderDiscount === "amount"
                            ? "discount-btn discount-selected"
                            : "discount-btn"
                        }
                        onClick={() => {
                          setValue2("order_discount_type", "amount");
                          let _totalAmount = 0;
                          for (let i = 0; i < basket.length; i++) {
                            const element = basket[i];
                            _totalAmount +=
                              parseInt(element?.article_price) *
                              parseInt(element?.article_quantity);
                          }
                          const disc = parseInt(getValues2("order_discount"));
                          //
                          const rs = _totalAmount - disc;
                          setDiscountOrderAmount(rs);
                          setNetPayable(rs);
                          //
                          setIsOrderDiscount("amount");
                        }}
                      >
                        Remise en Montant
                      </button>
                      <span className="discount-amount">
                        {discountOrderAmount} CDF
                      </span>
                    </div>
                    <div className="input-div">
                      <select
                        className="input-select"
                        {...register2("order_pay_mode")}
                      >
                        <option value={""} selected>
                          --- Mode de Paiement ---
                        </option>
                        <option value={"cash"}>Cash</option>
                        <option value={"mpesa"}>M-pesa</option>
                      </select>
                      {errors2.order_pay_mode && (
                        <span className="fade-in">
                          {errors2.order_pay_mode.message}
                        </span>
                      )}
                    </div>
                    <div className="input-div">
                      <select
                        className="input-select"
                        {...register2("order_status")}
                      >
                        <option value={""} selected>
                          --- Etat de commande/vente ---
                        </option>
                        <option value={"pending"}>En attente</option>
                        <option value={"approved"}>Approuvée</option>
                        <option value={"delivered"}>Livrée</option>
                      </select>
                      {errors2.order_status && (
                        <span className="fade-in">
                          {errors2.order_status.message}
                        </span>
                      )}
                    </div>
                    <div className="input-div">
                      <input
                        type="date"
                        className="input-form"
                        autoComplete="none"
                        placeholder=" "
                        {...register2("order_dates")}
                      />
                      <label htmlFor="order_dates" className="label-form">
                        Date
                      </label>
                      {errors2.order_dates && (
                        <span className="fade-in">
                          {errors2.order_dates.message}
                        </span>
                      )}
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        className="input-form"
                        autoComplete="none"
                        placeholder=" "
                        {...register2("customer")}
                      />
                      <label htmlFor="customer" className="label-form">
                        Client
                      </label>
                      {errors2.customer && (
                        <span className="fade-in">
                          {errors2.customer.message}
                        </span>
                      )}
                    </div>
                    <div className="bills">
                      <p className="title t-3">Net à payer</p>
                      <span>CDF {netPayable.toFixed(2)}</span>
                      <p className="title t-3">
                        Pour {totalQuantity} article*s
                      </p>
                    </div>
                    <button type="submit" className="button">
                      {isSending
                        ? "Enregistrement de la commande..."
                        : "Enregister"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
