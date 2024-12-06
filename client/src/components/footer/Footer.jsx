import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import LOGO_WHITE from "../../assets/logo-white.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="up">
          <div className="item">
            <Link to={"/"} className="link">
              <img src={LOGO_WHITE} alt="logo-main" className="logo" />
            </Link>
            <p className="title t-3">+243 83 53 17 807</p>
            <p className="title t-3">contact@mariathe.com</p>
            <p className="title t-3">
              04, Av. Assossa; C. Ngiri-Ngiri; <br />
              Ref. Lycée Movenda <br />
              Kinshasa - RDC
            </p>
          </div>
          <div className="item">
            <h3 className="title t-2">Service</h3>
            <p className="title t-3">Foire aux Questions</p>
            <Link to={"/order"} className="title t-3">
              Commande
            </Link>
          </div>
          <div className="item">
            <h3 className="title t-2">Contact</h3>
            <Link to={"/about"} className="title t-3">
              A propos de nous
            </Link>
            <p className="title t-3">Support</p>
            <p className="title t-3">Compte</p>
            <p className="title t-3">Politiques de confidentialité</p>
            <p className="title t-3">Conditions d'utilisation des services</p>
          </div>
          <div className="item">
            <h3 className="title t-2">Suivez-nous!</h3>
            <p className="title t-3">Facebook</p>
            <p className="title t-3">LinkedIn</p>
            <p className="title t-3">Twitter</p>
            <p className="title t-3">Instagram</p>
          </div>
        </div>
        <div className="down">
          <span>
            &copy; {new Date().getFullYear()} Mariathe Bakery, Tous droits
            reservés.
          </span>
          <Link to="https://afoundation.tech/" className="link" target="_blank">
            Développé par Afik Foundation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
