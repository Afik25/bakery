import React from "react";
import "./404.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const NotFound = () => {
  return (
    <div className="not-found">
      <Header />
      <div className="not-found-body">
        <h1 className="title t-1">Oups!</h1>
        <p className="title t-2">
          Nous n'avons pas trouvé la page que vous recherchiez.
        </p>
        <img
          src={process.env.PUBLIC_URL + "/404.png"}
          className="img"
          alt="404"
        />
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
