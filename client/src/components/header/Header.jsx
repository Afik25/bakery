import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { MdMenu } from "../../middlewares/icons";

const Header = () => {
  return (
    <div className={"header"}>
      <div className="container">
        <Link to={"/"} className="link">
          <img src={LOGO} alt="logo-main" className="logo" />
        </Link>
        <div className="drawer">
          <MdMenu className="icon" />
        </div>
        <div className="navs">
          <Link to="" className="link nav">
            Accueil
          </Link>
          <Link to="" className="link nav">
            À propos de nous
          </Link>
          <Link to="" className="link nav">
            Produits
          </Link>
          <Link to="" className="link nav">
            Contact
          </Link>
          <Link to="/order" className="link order-btn">
            Commander
          </Link>
        </div>
        <div className="signs">
          <Link to="/sign-up" className="link">
            S'inscrire
          </Link>
          <Link to="/sign-in" className="link button">
            Se Connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
