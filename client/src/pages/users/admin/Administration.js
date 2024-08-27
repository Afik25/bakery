import React from "react";
import "../users.css";
import LOGO from "../../../assets/logo.png";
import { Outlet } from "react-router-dom";
import { NavLink } from "../../../routes/NavLink";
import {
  MdOutlineDashboard,
  IoSettingsOutline,
  IoNotificationsOutline,
  BsBasket,
  FiLogOut,
  BiEnvelope,
  FiUsers,
  FiPackage,
} from "../../../middlewares/icons";
import { capitalize } from "../../../utils/utils";
import { useSelector } from "react-redux";

const Administration = () => {
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  return (
    <div className="user">
      <div className="left">
        <div className="header">
          <img src={LOGO} alt="orga-logo" />
        </div>
        <div className="body">
          <div className="navigation">
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link-option"
              to="/admin"
              exact={true}
            >
              <MdOutlineDashboard className="option-icon" />
              <span>Tableau de bord</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link-option"
              to="/admin/orders"
            >
              <BsBasket className="option-icon" />
              <span>Commandes</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link-option"
              to="/admin/stocks"
            >
              <FiPackage className="option-icon" />
              <span>Stocks</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link-option"
              to="/admin/users"
            >
              <FiUsers className="option-icon" />
              <span>Utilisateurs</span>
            </NavLink>
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link-option"
              to="/admin/configuration"
            >
              <IoSettingsOutline className="option-icon" />
              <span>Configuration</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="header">
          <div className="options">
            <div className="option">
              <IoNotificationsOutline className="icon-element" />
              <span></span>
            </div>
            <div className="option">
              <BiEnvelope className="icon-element" />
              <span></span>
            </div>
            <div className="profile">
              <img
                src={process.env.PUBLIC_URL + "/user.png"}
                alt="user-profile"
              />
              <h3 className="title t-2">
                {capitalize(connectedUser?.userInfo?.firstname) +
                  " " +
                  capitalize(connectedUser?.userInfo?.lastname)}
              </h3>
            </div>
            <button className="button logout">
              <FiLogOut className="icon-element" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
        <div className="body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Administration;
