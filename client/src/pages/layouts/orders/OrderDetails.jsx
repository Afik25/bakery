import React, { useState, useEffect } from "react";
import "./order-details.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "../../../middlewares/icons";
import moment from "moment";
import { isEmpty } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { onGetArticles } from "../../../services/configuration";
import { onUpdateStatusOrder } from "../../../services/order";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import Bill from "../../../components/bill/Bill";
//
import swal from "sweetalert";
import "moment/locale/fr";
moment.locale("fr");

const OrderDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isButtonSelected, setIsButtonSelected] = useState(0);
  const [isPrintBill, setIsPrintBill] = useState({
    isPrint: false,
    order: "",
  });
  const [basket, setBasket] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  let item = location.state.item;

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

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const articles = useSelector(
    (state) => state.setInitConf?.initArticles?.articlesData
  );

  const onSubmitUpdate = async (status) => {
    const _data = {
      order_id: parseInt(item?.id),
      order_status: status,
    };
    onUpdateStatusOrder(axiosPrivate, _data)
      .then((response) => {
        if (response?.data?.status) {
          swal({
            title: "Mariathe : Traitement Statut de la Commande",
            text: response?.data?.message,
            icon: "success",
          });
          navigate(-1);
        }
      })
      .catch((error) => {
        if (!error?.response) {
          swal({
            title: "Mariathe : Traitement Statut de la Commande",
            text: "No server response",
            icon: "warning",
          });
        } else {
          swal({
            title: "Mariathe : Traitement Statut de la Commande",
            text: error?.response?.data?.message,
            icon: "error",
          });
        }
      });
  };

  const onAddToBasket = () => {
    item?.detailsOrder?.forEach((element) => {
      //
      let getArticle = articles?.data?.articles?.filter(
        (item, _) => item?.id === element?.article_id
      );
      //
      setBasket((prevBasket) => [
        ...prevBasket,
        {
          article_id: element?.article_id,
          article_code: getArticle[0]?.code,
          article_title: getArticle[0]?.title,
          article_price: getArticle[0]?.price,
          article_currency: getArticle[0]?.currency,
          article_quantity: element?.quantity,
          discount: element?.discount,
          discount_type: element?.discount_type,
          pay_from_discount:
            getArticle[0]?.price -
            (element?.discount / 100) * getArticle[0]?.price,
          total_price:
            element?.discount_type === "percent"
              ? (getArticle[0]?.price -
                  (element?.discount / 100) * getArticle[0]?.price) *
                element?.quantity
              : (getArticle[0]?.price - element?.discount) * element?.quantity,
        },
      ]);
    });
  };

  return (
    <div className="order-details">
      <div className="inner">
        <div className="od-left">
          <button className="button" onClick={() => navigate(-1)}>
            <FaArrowLeft className="icon" />
            <span>Retour</span>
          </button>
          <div className="od-left-head">
            <span>Commande Numéro :</span>
            <h2 className="title t-2">{item?.code}</h2>
          </div>
          <div className="od-left-details">
            <div className="column">
              <span className="title t-3">Agent</span>
              <h2 className="title t-2">{item?.user_name}</h2>
            </div>
            <div className="column">
              <span className="title t-3">Date d'Emission</span>
              <h2 className="title t-2">
                {moment(item?.dates).format("LLLL")}
              </h2>
            </div>
            <div className="column">
              <span className="title t-3">
                Nombre total d'Articles Commandés
              </span>
              <h2 className="title t-2">{item?.detailsOrder?.length}</h2>
            </div>
            <div className="column">
              <span className="title t-3">Quantitée Totale Commandée</span>
              <h2 className="title t-2">{item?.total_quantity}</h2>
            </div>
            <div className="column">
              <span className="title t-3">Montant Total (CDF)</span>
              <h2 className="title t-2">{item?.pay_from_discount}</h2>
            </div>
            <div className="column">
              <span className="title t-3">Remise</span>
              <h2 className="title t-2">{item?.discount}</h2>
            </div>
            <div className="column">
              <span className="title t-3">Remise appliquée en (Type)</span>
              <h2 className="title t-2">
                {item?.discount_type === "percent"
                  ? "Pourcentage (%)"
                  : "Montant Total"}
              </h2>
            </div>
            <div className="column">
              <span className="title t-3">Mode de paiement</span>
              <h2 className="title t-2">{item?.pay_mode}</h2>
            </div>
            <div className="column">
              <span className="title t-3">Client</span>
              <h2 className="title t-2">{item?.customer}</h2>
            </div>
            <div className="column">
              <span className="title t-3">État de la commande (Statut)</span>
              <h2 className="title t-2">{item?.status}</h2>
            </div>
          </div>
        </div>
        <div className="od-right">
          <div className="odr-actions">
            <h3 className="title t-3">Détails commande (Panier)</h3>
            <button
              className="button canceled"
              onClick={() => onSubmitUpdate("canceled")}
            >
              Annuler
            </button>
            <button
              className="button approuved"
              onClick={() => onSubmitUpdate("approved")}
            >
              Approuver
            </button>
            <button
              className="button delivered"
              onClick={() => onSubmitUpdate("delivered")}
            >
              Livrée
            </button>
            <button
              className="button print"
              onClick={() => {
                onAddToBasket();
                setIsPrintBill({ isPrint: true, order: item });
              }}
            >
              Imprimer Facture
            </button>
          </div>
          <div className="odr-container">
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
                    <th className="col-1 text-align-center">A payer (CDF)</th>
                    <th className="col-2 text-align-center">
                      Prix Total (CDF)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isEmpty(item?.detailsOrder) ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        La commande est vide!
                      </td>
                    </tr>
                  ) : (
                    item?.detailsOrder?.map((el, idx) => {
                      let _article = articles?.data?.articles.filter(
                        (_art, _) => _art?.id === el?.article_id
                      );
                      return (
                        <tr key={idx}>
                          <td className="col-2 text-align-left">
                            {_article[0]?.title}
                          </td>
                          <td className="col-1 text-align-center">
                            {el?.quantity}
                          </td>
                          <td className="col-2 text-align-center">
                            {parseInt(_article[0]?.price).toFixed(2)}
                          </td>
                          <td className="col-1 text-align-center">
                            {el?.discount}
                            {el?.discount_type === "percent" ? " %" : " CDF"}
                          </td>
                          <td className="col-1 text-align-center">
                            {parseInt(el?.pay_from_discount).toFixed(2)}
                          </td>
                          <td className="col-2 text-align-center">
                            {parseInt(el?.total_price).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPrintBill?.isPrint && (
        <div className="outer">
          <Bill
            setIsPrintBill={setIsPrintBill}
            order={item}
            basket={basket}
            setBasket={setBasket}
          />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
