import React, { useRef } from "react";
import "./bill.css";
import ASSETS from "../../utils/Assets";
import { useReactToPrint } from "react-to-print";

const Bill = ({ setIsBill }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <>
      <div className="bill-head">
        <button className="button btn-cancel" onClick={() => setIsBill(false)}>
          Annuler
        </button>
        <button className="button" onClick={handlePrint}>
          Imprimer
        </button>
      </div>
      <div className="bill-wrapper" ref={contentRef}>
        <div className="bill-container">
          <img src={ASSETS?.logo} />
          <h1 className="title t-1">Mariathe</h1>
          <h2 className="title t-2">Boulangerie - Patisserie - Restaurant</h2>
          <h3 className="title t-3">KINSHASA</h3>
          <p className="title t-4">
            04, Av. Assossa; C. Ngiri-Ngiri; Ref. Lycée Movenda Kinshasa - RDC
          </p>
          <div className="bill-table">
            <table>
              <thead>
                <tr>
                  <th className="col-1">Quantité</th>
                  <th className="col-2">Libellé</th>
                  <th className="col-3">Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-1">1</td>
                  <td className="col-2">Cake</td>
                  <td className="col-3">10.00</td>
                </tr>
                <tr>
                  <td className="col-1">3</td>
                  <td className="col-2">Fruits</td>
                  <td className="col-3">100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bill-details">
            <div className="bill-row">
              <h1 className="title t-2">Total</h1>
              <h1 className="title t-2">$110.00</h1>
            </div>
          </div>
          <div className="bill-hr">
            <hr />
            <hr />
          </div>
          <p className="title t-5">Merci pour votre visite.</p>
        </div>
      </div>
    </>
  );
};

export default Bill;
