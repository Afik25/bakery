import React, { useState, useEffect } from "react";
import "./order.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  BsBasket,
  FaStar,
  FaRegStar,
  FaMinus,
  FaPlus,
} from "../../middlewares/icons";
import {
  onGetCategoriesForPage,
  onGetArticlesForPage,
} from "../../services/configuration";
import { onCreateOrderForPage } from "../../services/order";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmpty,
  wait,
  capitalize,
  validationSchemaCustomerOrder,
} from "../../utils/utils";
import ASSETS from "../../utils/Assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from "sweetalert";

const Order = () => {
  const [onOpenBasket, setOnOpenBasket] = useState(false);
  const dispatch = useDispatch();
  //
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [articlesArray, setArticlesArray] = useState([]);
  //
  const [currentArticle, setCurrentArticle] = useState({
    article_id: "",
    title: "",
    price: "",
    currency: "",
    article_quantity: 1,
    discount: 0,
    discount_type: "---",
    pay_from_discount: 0,
    total_price: 0,
  });
  const [basketArray, setBasketArray] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetCategoriesForPage(signal).then((result) => {
      dispatch({
        type: "setUp/getCategories",
        payload: result,
      });
    });

    onGetArticlesForPage(signal).then((result) => {
      dispatch({
        type: "setUp/getArticles",
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
  const articles = useSelector(
    (state) => state.setInitConf?.initArticles?.articlesData
  );

  useEffect(() => {
    setArticlesArray(selectedCategory === 0 && articles?.data?.articles);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaCustomerOrder),
  });

  const onAddToBasket = () => {
    setBasketArray([...basketArray, currentArticle]);
  };

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(200);
    //
    const _data = {
      user_id: null,
      order_dates: new Date(),
      order_quantity: basketArray?.reduce(
        (cum, cur) => (cum = cum + parseFloat(cur?.article_quantity)),
        0
      ),
      order_discount: 0,
      order_discount_type: "---",
      order_pay_from_discount: basketArray?.reduce(
        (cum, cur) =>
          (cum =
            cum + parseFloat(cur?.article_quantity) * parseFloat(cur?.price)),
        0
      ),
      order_pay_mode: "---",
      order_status: "pending",
      customer: data?.names + "/ " + data?.mail + "/ " + data?.telephone,
      order_details: basketArray,
    };
    //
    onCreateOrderForPage(_data)
      .then((response) => {
        if (response?.data?.status) {
          setIsSending(false);
          swal({
            title: "Mariathe - Nouvelle Commande",
            icon: "success",
            text: response?.data?.message,
          });
        }
        const timer = setTimeout(() => {
          setBasketArray([]);
          reset();
          setCurrentArticle({
            article_id: "",
            title: "",
            price: "",
            currency: "",
            article_quantity: 1,
            discount: 0,
            discount_type: "---",
            pay_from_discount: 0,
            total_price: 0,
          });
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        if (!error?.response) {
          swal({
            title: "Mariathe - Nouvelle Commande",
            icon: "warning",
            text: "No server response",
          });
        } else {
          swal({
            title: "Mariathe - Nouvelle Commande",
            icon: "error",
            text: error?.response?.data?.message,
          });
        }
      });
  };

  return (
    <div className="orders">
      <div className="orders-inner">
        <Header />
        <div className="order-body">
          <div className="container">
            <div className="market">
              <button className="button" onClick={() => setOnOpenBasket(true)}>
                <BsBasket className="icon" />
              </button>
              <p className="title t-3">
                {basketArray.length === 0
                  ? "Vous n'avez aucun article dans votre panier"
                  : `Vous avez ${basketArray.length} articles dans votre panier`}
              </p>
            </div>
            {isEmpty(categories?.data?.categories) ? (
              <div>Aucun article n'est encore défini!</div>
            ) : (
              <>
                <div className="filter">
                  <div
                    className={
                      selectedCategory === 0 ? "button selected" : "button"
                    }
                    onClick={() => {
                      setSelectedCategory(0);
                      setArticlesArray(articles?.data?.articles);
                    }}
                  >
                    Tous les articles
                  </div>
                  {categories?.data?.categories?.map((item, idx) => {
                    return (
                      <div
                        className={
                          selectedCategory === item?.id
                            ? "item selected"
                            : "item"
                        }
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(item?.id);
                          let filterArticles = articles?.data?.articles.filter(
                            (_it, k) => _it.category_id === item?.id
                          );
                          console.log({ filterArticles: filterArticles });
                          setArticlesArray(filterArticles);
                        }}
                      >
                        <img src={ASSETS.logo} alt={`cat-${idx + 1}`} />
                        <h3 className="title t-2">{capitalize(item?.title)}</h3>
                      </div>
                    );
                  })}
                </div>
                <div className="content">
                  {isEmpty(articlesArray) ? (
                    <div>
                      Aucun article disponible pour la catégorie selectionnée
                    </div>
                  ) : (
                    articlesArray.map((element, _idx) => {
                      return (
                        <div className="item" key={_idx}>
                          <img src={ASSETS.boulBread} alt="img-item" />
                          <h3 className="title t-2">
                            {capitalize(element?.title)}
                          </h3>
                          <p className="title t-3">
                            {element?.currency} {element?.price}
                          </p>
                          <div className="starts">
                            <FaStar className="icon" />
                            <FaStar className="icon" />
                            <FaStar className="icon" />
                            <FaRegStar className="icon" />
                            <FaRegStar className="icon" />
                          </div>
                          <button
                            className="button"
                            onClick={() => {
                              setCurrentArticle({
                                article_id: element?.id,
                                title: element?.title,
                                price: element?.price,
                                currency: element?.currency,
                                article_quantity:
                                  currentArticle?.article_quantity,
                                discount: currentArticle?.discount,
                                discount_type: currentArticle?.discount_type,
                                pay_from_discount:
                                  parseFloat(currentArticle?.article_quantity) *
                                  parseFloat(element?.price),
                                total_price:
                                  parseFloat(currentArticle?.article_quantity) *
                                  parseFloat(element?.price),
                              });
                              setOnOpenBasket(true);
                            }}
                          >
                            Commander
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
      {onOpenBasket && (
        <div className="orders-outer">
          <div className="orders-outer-wrapper">
            <div className="oow-head">
              <h2 className="title t-2">Mon Pannier</h2>
              <h3 className="title t-3">
                {basketArray?.length > 0
                  ? `Vous avez ${basketArray?.length} articles dans votre panier`
                  : "Votre panier est vide!"}
              </h3>
              <span
                className="close"
                onClick={() => {
                  setCurrentArticle({
                    article_id: "",
                    title: "",
                    price: "",
                    currency: "",
                    article_quantity: 1,
                    discount: 0,
                    discount_type: "---",
                    pay_from_discount: 0,
                    total_price: 0,
                  });
                  setOnOpenBasket(false);
                }}
              >
                &times;
              </span>
            </div>
            <form className="oow-body" onSubmit={handleSubmit(onSubmit)}>
              {!isEmpty(currentArticle.title) && (
                <div className="oow-item">
                  <div className="oow-item-left">
                    <button
                      type="button"
                      className="button"
                      onClick={() =>
                        setCurrentArticle({
                          article_id: currentArticle?.article_id,
                          title: currentArticle?.title,
                          price: currentArticle?.price,
                          currency: currentArticle?.currency,
                          article_quantity:
                            currentArticle?.article_quantity > 1
                              ? currentArticle?.article_quantity - 1
                              : 1,
                          discount: currentArticle?.discount,
                          discount_type: currentArticle?.discount_type,
                          pay_from_discount:
                            parseFloat(currentArticle?.article_quantity) *
                            parseFloat(currentArticle?.price),
                          total_price:
                            parseFloat(currentArticle?.article_quantity) *
                            parseFloat(currentArticle?.price),
                        })
                      }
                    >
                      <FaMinus className="icon" />
                    </button>
                    <img src={ASSETS.squareBread} alt="img-item" />
                    <button
                      type="button"
                      className="button"
                      onClick={() =>
                        setCurrentArticle({
                          article_id: currentArticle?.article_id,
                          title: currentArticle?.title,
                          price: currentArticle?.price,
                          currency: currentArticle?.currency,
                          article_quantity:
                            currentArticle?.article_quantity + 1,
                          discount: currentArticle?.discount,
                          discount_type: currentArticle?.discount_type,
                          pay_from_discount:
                            parseFloat(currentArticle?.article_quantity) *
                            parseFloat(currentArticle?.price),
                          total_price:
                            parseFloat(currentArticle?.article_quantity) *
                            parseFloat(currentArticle?.price),
                        })
                      }
                    >
                      <FaPlus className="icon" />
                    </button>
                  </div>
                  <div className="oow-item-right">
                    <h3 className="title t-3">
                      {capitalize(currentArticle?.title)}
                    </h3>
                    <p className="title t-2">
                      {currentArticle?.price} {currentArticle?.currency}
                    </p>
                    <span>Quantité : {currentArticle?.article_quantity}</span>
                    <button
                      type="button"
                      className="button"
                      onClick={() => onAddToBasket()}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              )}
              <div className="oow-basket">
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th className="col-05 text-align-left">Nº</th>
                        <th className="col-2 text-align-left">Article</th>
                        <th className="col-1 text-align-center">
                          Prix Unitaire (CDF)
                        </th>
                        <th className="col-05 text-align-center">Quantité</th>
                        <th className="col-1 text-align-center">Total (CDF)</th>
                        <th className="col-05 text-align-center">###</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isEmpty(basketArray) ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", color: "gray" }}
                          >
                            Aucun article dans le panier!
                          </td>
                        </tr>
                      ) : (
                        basketArray.map((art, i) => {
                          return (
                            <tr key={i}>
                              <td className="col-05 text-align-left">
                                {i + 1}
                              </td>
                              <td className="col-2 text-align-left">
                                {art?.title}
                              </td>
                              <td className="col-1 text-align-center">
                                {art?.price}
                              </td>
                              <td className="col-05 text-align-center">
                                {art?.article_quantity}
                              </td>
                              <td className="col-1 text-align-center">
                                {art?.price * art?.article_quantity}
                              </td>
                              <td className="col-05 text-align-center">
                                <button type="button">Supprimer</button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {basketArray?.length > 0 && (
                <>
                  <div className="row">
                    <div className="input-div">
                      <input
                        type="text"
                        className="input-form"
                        autoComplete="none"
                        placeholder=" "
                        {...register("names")}
                      />
                      <label htmlFor="names" className="label-form">
                        Votre Noms
                      </label>
                      {errors.names && (
                        <span className="fade-in">{errors.names.message}</span>
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
                        Votre Adresse E-mail
                      </label>
                      {errors.mail && (
                        <span className="fade-in">{errors.mail.message}</span>
                      )}
                    </div>
                  </div>
                  <div className="input-div">
                    <input
                      type="text"
                      className="input-form"
                      autoComplete="none"
                      placeholder=" "
                      {...register("telephone")}
                    />
                    <label htmlFor="telephone" className="label-form">
                      Votre Numéro de téléphone
                    </label>
                    {errors.telephone && (
                      <span className="fade-in">
                        {errors.telephone.message}
                      </span>
                    )}
                  </div>
                </>
              )}
              <div className="oow-validate">
                <h2 className="title t-1">
                  Net à payer (CDF) :{" "}
                  <span>
                    {basketArray?.reduce(
                      (cum, cur) =>
                        (cum =
                          cum +
                          parseFloat(cur?.price) *
                            parseFloat(cur?.article_quantity)),
                      0
                    )}
                  </span>
                </h2>
                {isSending ? (
                  <p>Traitement de votre demande...</p>
                ) : (
                  <button className="button">Envoyer ma commande</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
