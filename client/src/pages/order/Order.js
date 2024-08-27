import React from "react";
import "./order.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { BsBasket, FaStar, FaRegStar } from "../../middlewares/icons";
import BAKERY1 from "../../assets/images/bakery1.png";

const Order = () => {
  return (
    <div className="orders">
      <Header />
      <div className="oder-body">
        <div className="container">
          <div className="market">
            <button className="button">
              <BsBasket className="icon" />
            </button>
            <p className="title t-3">
              Vous n'avez aucun article dans votre panier
            </p>
          </div>
          <div className="filter">
            <div className="button">Tous les articles</div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Lushois</h3>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Gomatracien</h3>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Bukavucien</h3>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Bishi wewa</h3>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Mosaka</h3>
            </div>
          </div>
          <div className="content">
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
            <div className="item">
              <img src={BAKERY1} alt="img-item" />
              <h3 className="title t-2">Pain Kinois</h3>
              <p className="title t-3">CDF 1000</p>
              <div className="starts">
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaStar className="icon" />
                <FaRegStar className="icon" />
                <FaRegStar className="icon" />
              </div>
              <button className="button">Commander</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
