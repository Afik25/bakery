import React from "react";
import "./loader.css"
import ASSETS from "../../utils/Assets";

const Loader = () => {
  return <div className="loader">
    <img src={ASSETS?.logo} alt="loading"/>
  </div>;
};

export default Loader;
