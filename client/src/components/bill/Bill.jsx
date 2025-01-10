import React, { useRef } from "react";
// import styled from "styled-components";
import "./bill.css";
import LOGO from "../../assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { capitalize, amountFormatter } from "../../utils/utils";
//
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const Bill = ({ setIsPrintBill, order, basket, setBasket }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef,
  });

  // console.log({ "Bill Checkout Order ": order });

  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  return (
    <>
      <div className="bill-head">
        <button
          className="button btn-cancel"
          onClick={() => {
            setBasket([]);
            setIsPrintBill({ isPrintBill: false, order: "" });
          }}
        >
          Annuler
        </button>
        <button className="button" onClick={handlePrint}>
          Imprimer
        </button>
      </div>
      <div className="bill-wrapper" ref={contentRef}>
        <div className="bill-container">
          <img src={LOGO} alt="Mariathe, Boulangerie-Patisserie-Restuarant" />
          <h1 className="title t-1">Mariathe, Congo - Kinshasa</h1>
          <h2 className="title t-2">Boulangerie - Patisserie - Restaurant</h2>
          <h1 className="title t-1">RCCM: CD/KNG/RCCM/24-A-04675 </h1>
          <h1 className="title t-1">ID. Nat.: 01-C1006-N68131Q</h1>
          <h1 className="title t-1">+243 83 53 17 807</h1>
          <h1 className="title t-1">contact@mariathe.com</h1>
          <p className="title t-4">
            04, Av. Assossa; C. Ngiri-Ngiri; Ref. Lycée Movenda Kinshasa - RDC
          </p>
          <div className="head-row">
            <div className="head-column">
              <h1 className="title t-1">Nº Fac. : {order?.code}</h1>
              <h1 className="title t-1">
                Date : {moment().format("DD/MMM/YYYY HH:mm:ss")}
              </h1>
            </div>
            <div className="head-column">
              <h1 className="title t-1">
                Agent :{" "}
                {capitalize(connectedUser?.userInfo?.firstname) +
                  " " +
                  capitalize(connectedUser?.userInfo?.lastname)}
              </h1>
              <h1 className="title t-1">
                Client(e) : {capitalize(order?.customer)}
              </h1>
            </div>
          </div>
          <div className="bill-table">
            <table>
              <thead>
                <tr>
                  <th className="col-2">Libellé</th>
                  <th className="col-1">Quantité</th>
                  <th className="col-1">Prix Unit.</th>
                  <th className="col-1">Prix Total</th>
                </tr>
              </thead>
              <tbody>
                {basket?.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="col-2 text-align-left">
                        {item?.article_title?.toUpperCase()}
                      </td>
                      <td className="col-1 text-align-center">
                        {item?.article_quantity}
                      </td>
                      <td className="col-2 text-align-center">
                        {amountFormatter(parseInt(item?.article_price))}
                      </td>
                      <td className="col-2 text-align-center">
                        {amountFormatter(parseInt(item?.total_price))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bill-details">
            <div className="bill-row">
              <h1 className="title t-2">Net à Payer (CDF):</h1>
              <h1 className="title t-2">
                {amountFormatter(
                  basket?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.total_price;
                  }, 0)
                )}
              </h1>
            </div>
          </div>
          <div className="bill-hr">
            <hr />
            <hr />
          </div>
          <p className="title t-5">
            Merci pour votre visite et à très bientôt.
          </p>
          <p className="title t-5">
            Marchandises vendues ne sont ni reprises, ni échangées.
          </p>
          <p className="title t-5">Visitez-nous sur : www.mariathe.com</p>
        </div>
      </div>
    </>
  );
};

export default Bill;
