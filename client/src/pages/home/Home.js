import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BAKERY1 from "../../assets/images/bakery1.png";
import BAKERY2 from "../../assets/images/bakery2.png";
import BAKERY3 from "../../assets/images/bakery3.png";
import BAKERY4 from "../../assets/images/bakery4.png";
import BAKERY5 from "../../assets/images/bakery5.png";
import BAKERY6 from "../../assets/images/bakery6.png";
import BAKERY7 from "../../assets/images/bakery7.png";
import BAKERY8 from "../../assets/images/bakery8.png";
import BAKERY9 from "../../assets/images/bakery9.png";
import BAKERY11 from "../../assets/images/bakery11.png";
//
import AIRTEL from "../../assets/images/airtel-money.png";
import M_PESA from "../../assets/images/m-pesa-logo.png";
import ORANGE from "../../assets/images/orange-money.png";
import MASTERCARD from "../../assets/images/matsercard.png";
import VISA from "../../assets/images/visa.png";
//
import { FaShoppingBasket, FaMedal, GrDeliver } from "../../middlewares/icons";

const Home = () => {

  return (
    <React.Fragment>
      <Helmet>
        <title>Home - Mariathe Bakery</title>
        <meta name="description" content="" />
        <meta name="keywords" content="bread, pain, cake, gateau" />
      </Helmet>
      <div className="home">
        <Header/>
        <div className="banner">
          <div className="inner">
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
          </div>
          <div className="outer">
            <div className="left">
              <h1 className="title t-1">goûtez à la différence,</h1>
              <p className="title t-3">
                notre approche artisanale de l'alimentation.
              </p>
              <h2 className="title t-2">Bon Appétit!</h2>
            </div>
            <div className="right">
              <img src={BAKERY1} alt="banner" className="img" />
            </div>
          </div>
        </div>
        <div className="ruban">
          <div className="inner">
            <div className="container">
              <img src={BAKERY9} alt="ruban" className="img img1" />
              <img src={BAKERY6} alt="ruban" className="img img2" />
            </div>
          </div>
          <div className="outer">
            <div className="container">
              <div className="left">
                <img src={BAKERY4} alt="ruban" className="img" />
              </div>
              <div className="right">
                <h1 className="title t-1">Savourez la pureté du goût</h1>
                <p className="title t-3">
                  Nous proposons une variété de pains, y compris les classiques
                  comme les baguettes et les petits pains, ainsi que des saveurs
                  plus uniques comme l'ail et les herbes ou les tomates séchées
                  au soleil.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order">
          <div className="container">
            <p className="title t-2">
              Commandez et payez facilement de là où vous étes à travers les
              canaux de paiement indiqués
            </p>
            <div className="pay-channels">
              <img src={AIRTEL} alt="airtel" />
              <img src={ORANGE} alt="orange" />
              <img src={M_PESA} alt="m_pesa" />
              <img src={MASTERCARD} alt="mastercard" />
              <img src={VISA} alt="visa" />
            </div>
            <Link to="/order" className="button order-btn">
              Commander
            </Link>
          </div>
        </div>
        <div className="process">
          <div className="container">
            <h2 className="title t-1">Pourquoi Mariathe ?</h2>
            <div className="content">
              <div className="item">
                <div className="icon-wrapper">
                  <FaShoppingBasket className="icon" />
                </div>
                <h2 className="title t-2">Facilité de commande</h2>
                <p className="title t-3">
                  Notre mission est de ramener l'art de la fabrication du pain à
                  ses racines et de partager notre passion pour le pain avec
                  d'autres.
                </p>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <GrDeliver className="icon" />
                </div>
                <h2 className="title t-2">Livraison rapide</h2>
                <p className="title t-3">
                  Notre mission est de ramener l'art de la fabrication du pain à
                  ses racines et de partager notre passion pour le pain avec
                  d'autres.
                </p>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <FaMedal className="icon" />
                </div>
                <h2 className="title t-2">Test de pureté</h2>
                <p className="title t-3">
                  Notre mission est de ramener l'art de la fabrication du pain à
                  ses racines et de partager notre passion pour le pain avec
                  d'autres.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="process offers">
          <div className="container">
            <h2 className="title t-1">Bénéficiez de la meilleure offre</h2>
            <div className="content">
              <div className="item">
                <div className="img-wrapper up">
                  <img src={BAKERY5} alt="item" className="img" />
                </div>
                <h2 className="title t-2">Kinshasa Bread</h2>
                <p className="title t-3">
                  Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins.
                </p>
              </div>
              <div className="item">
                <h2 className="title t-2">Leopard Bread</h2>
                <p className="title t-3">
                  Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins.
                </p>
                <div className="img-wrapper down">
                  <img src={BAKERY7} alt="item" className="img" />
                </div>
              </div>
              <div className="item">
                <div className="img-wrapper up">
                  <img src={BAKERY8} alt="item" className="img" />
                </div>
                <h2 className="title t-2">Combo Bread</h2>
                <p className="title t-3">
                  Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins.
                </p>
              </div>
              <div className="item">
                <div className="img-wrapper up">
                  <img src={BAKERY11} alt="item" className="img" />
                </div>
                <h2 className="title t-2">Standard Bread</h2>
                <p className="title t-3">
                  Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins.
                </p>
              </div>
              <div className="item">
                <h2 className="title t-2">Bread of Bread</h2>
                <p className="title t-3">
                  Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins.
                </p>
                <div className="img-wrapper down">
                  <img src={BAKERY2} alt="item" className="img" />
                </div>
              </div>
              <div className="item">
                <div className="img-wrapper up">
                  <img src={BAKERY3} alt="item" className="img" />
                </div>
                <h2 className="title t-2">Bread Data</h2>
                <p className="title t-3">
                  Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="news-letter">
          <div className="container">
            <div className="inner">
              <img src={BAKERY8} alt="item" className="img" />
            </div>
            <div className="outer">
              <h3 className="title t-2">
                Inscrivez-vous pour obtenir des codes de réduction intéressants
              </h3>
              <p className="title t-3">
                Nous pensons que le bon pain est plus qu'un simple aliment,
                c'est une expérience.
              </p>
              <form>
                <input type="text" placeholder="tapez votre adresse e-mail" />
                <button className="button">S'Inscrire!</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
