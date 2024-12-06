import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { MdMenu, MdClose } from "../../middlewares/icons";

const Header = ({ fix }) => {
  const [isDrawer, setIsDrawer] = useState(false);

  return (
    <div
      className={
        fix && isDrawer
          ? "header fixed open-drawer"
          : fix && !isDrawer
          ? "header fixed"
          : !fix && isDrawer
          ? "header open-drawer"
          : "header"
      }
    >
      <div className="container">
        <Link to={"/"} className="link">
          <img src={LOGO} alt="logo-main" className="logo" />
        </Link>
        <div className="drawer" onClick={() => setIsDrawer(!isDrawer)}>
          {isDrawer ? (
            <MdClose className="icon" />
          ) : (
            <MdMenu className="icon" />
          )}
        </div>
        <div className="navs">
          <Link to="/" className="link nav">
            Accueil
          </Link>
          <Link to="/about" className="link nav">
            À propos de nous
          </Link>
          <Link to="/products" className="link nav">
            Nos Produits
          </Link>
          <Link to="/communion" className="link nav">
            La Cène
          </Link>
          <Link to="/contacts" className="link nav">
            Contacts
          </Link>
          <Link to="/order" className="link order-btn">
            Commander
          </Link>
        </div>
        <div className="signs">
          <Link to="" className="link">
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
