import React, { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "link nav active-nav" : "link nav inactive-nav"
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "link nav active-nav" : "link nav inactive-nav"
            }
          >
            À propos de nous
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "link nav active-nav" : "link nav inactive-nav"
            }
          >
            Nos Produits
          </NavLink>
          <NavLink
            to="/communion"
            className={({ isActive }) =>
              isActive ? "link nav active-nav" : "link nav inactive-nav"
            }
          >
            La Cène
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "link nav active-nav" : "link nav inactive-nav"
            }
          >
            Contacts
          </NavLink>
          <Link to="/order" className="link order-btn">
            Commander
          </Link>
        </div>
        <div className="signs">
          {/* <Link to="" className="link">
            S'inscrire
          </Link> */}
          <Link to="/sign-in" className="link button">
            Se Connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
