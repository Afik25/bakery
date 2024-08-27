import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return <div className="not-found">
    <Link to="/" className="link">Back to Home</Link>
    <img src={process.env.PUBLIC_URL + "/404.png"} className="img" alt="404"/>
  </div>;
};

export default NotFound;
