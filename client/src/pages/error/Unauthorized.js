import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return <div className="not-found">
  <Link to="/" className="link">Back to Home</Link>
  <img src={process.env.PUBLIC_URL + "/error_401.jpg"} className="img" alt="error"/>
</div>;
};

export default Unauthorized;
