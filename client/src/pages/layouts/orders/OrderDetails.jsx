import React, { useState, useEffect } from "react";
import "./order-details.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "../../../middlewares/icons";
import moment from "moment";
import { isEmpty } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { onGetArticles } from "../../../services/configuration";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
//
import "moment/locale/fr";
moment.locale("fr");

const OrderDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isButtonSelected, setIsButtonSelected] = useState(0);
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

  return (
    <div className="order-details">
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
            <h2 className="title t-2">{moment(item?.dates).format("LLLL")}</h2>
          </div>
          <div className="column">
            <span className="title t-3">Nombre total d'Articles Commandés</span>
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
            onClick={() => null}
          >
            Annuler
          </button>
          <button
            className="button approuved"
            onClick={() => null}
          >
            Approuver
          </button>
          <button
            className="button delivered"
            onClick={() => null}
          >
            Livrée
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
                  <th className="col-2 text-align-center">Prix Total (CDF)</th>
                  <th className="col-2 text-align-center">Actions</th>
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
                        <td className="col-2 text-align-center">
                          <button
                            className="button"
                            //   onClick={() => onUpdate(el, idx)}
                          >
                            <FaEdit className="icon" />
                          </button>
                          <button
                            className="button"
                            //   onClick={() => onRemove(idx)}
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
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
