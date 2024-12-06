import React from "react";
import "./configuration.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "../../../routes/NavLink";
import { useSelector } from "react-redux";

const Configuration = () => {
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );
  return (
    <div className="configuration">
      <div className="conf-head">
        <h2 className="title t-2">Configuration</h2>
        <p className="title t-3">
          Configuration et predefinition des éléments necessaire relatif aux
          articles, categories et profile.
        </p>
        <div className="navs">
          {connectedUser?.userInfo?.sys_role === "admin" && (
            <>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/configuration"
                exact={true}
              >
                <span>Article</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/configuration/categories"
              >
                <span>Categorie</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/configuration/profile"
              >
                <span>Profile</span>
              </NavLink>
            </>
          )}
          {connectedUser?.userInfo?.sys_role === "manager" && (
            <>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/manager/configuration"
                exact={true}
              >
                <span>Article</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/manager/configuration/categories"
              >
                <span>Categorie</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/manager/configuration/profile"
              >
                <span>Profile</span>
              </NavLink>
            </>
          )}
          {connectedUser?.userInfo?.sys_role === "user" && (
            <NavLink
              activeClassName="active-option"
              inactiveClassName="inactive-option"
              className="link-option"
              to="/user/configuration"
              exact={true}
            >
              <span>Profile</span>
            </NavLink>
          )}
        </div>
      </div>
      <div className="conf-body">
        <Outlet />
      </div>
    </div>
  );
};

export default Configuration;
