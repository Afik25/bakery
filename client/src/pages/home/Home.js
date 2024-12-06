import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
//
import {
  FaShoppingBasket,
  FaMedal,
  FaUniregistry,
  IoBagCheckOutline,
  MdSwitchAccessShortcutAdd,
  CgCommunity,
  GrScheduleNew,
  FaMapLocationDot,
  TbLayersDifference,
  BiSolidOffer,
  FaFirstOrderAlt,
  GrProductHunt,
  FcAdvertising,
  MdOutlineBorderColor,
  SiVega,
  SiElement,
  MdConnectWithoutContact,
  SiPicpay,
} from "../../middlewares/icons";
import ASSETS from "../../utils/Assets";
//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { wait, validationSchemaNewsletter } from "../../utils/utils";
import { onSubscription } from "../../services/user";
import useAxiosPrivate from "../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../components/msgBox/MessageBox";

const Home = () => {
  const [fix, setFix] = useState(false);
  //
  const axiosPrivate = useAxiosPrivate();
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const scrollDemoRef = useRef(null);

  const fixedOnscroll = () => {
    if (scrollDemoRef.current) {
      const { scrollTop } = scrollDemoRef.current;
      if (scrollTop >= 1000) {
        setFix(true);
      } else {
        setFix(false);
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaNewsletter),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(400);
    //
    onSubscription(axiosPrivate, data)
      .then((response) => {
        if (response?.data?.status) {
          setIsSending(false);
          setIsShowingMessage(true);
          setMessage({ type: "success", text: response?.data?.message });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
          reset();
        }, 4000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setIsShowingMessage(true);
        if (!error?.response) {
          setMessage({ type: "warning", text: "No server response" });
        } else {
          setMessage({
            type: "error",
            text: error?.response?.data?.message,
          });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
        }, 4000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Accueil Mariathe : Boulangerie Artisanale - Pain Frais et Pâtisseries
        </title>
        <meta
          name="description"
          content="Une boulangerie avec une approche artisanale locale"
        />
        <meta
          name="keywords"
          content="bread, pain, cake, gateau, boulangerie, patisserie, cène, hosties, croissant"
        />
      </Helmet>
      <div className="home" ref={scrollDemoRef} onScroll={fixedOnscroll}>
        <Header fix={fix} />
        <div className="banner">
          <div
            className="inner"
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="1000"
            data-aos-offset="50"
          >
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
          </div>
          <div className="outer">
            <div className="left">
              <h1 className="title t-1">Goûtez à la différence,</h1>
              <p className="title t-3">
                Chaque bouchée est un mélange parfait de qualité.
              </p>
              <h2
                className="title t-2"
                data-aos="zoom-in"
                data-aos-delay="500"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                Bienvenue <br />
                chez Mariathe!
              </h2>
            </div>
            <div className="right" data-aos="fade-up">
              <img
                src={ASSETS.BAKERY1}
                alt="Pains artisanale de la boulangerie mariathe, fabriqué suivant les normes hygienique et environnementale"
                className="img"
              />
            </div>
          </div>
        </div>
        <div className="ruban">
          <div className="inner" data-aos="fade-right">
            <div className="container">
              <img
                src={ASSETS.BAKERY9}
                alt="A base de malte pure, les pains de chez mariathe sont fabriqué avec le respect de règles de l'art"
                className="img img1"
              />
              <img
                src={ASSETS.BAKERY6}
                alt="Votre panier n'a jamais été aussi élegant qu'avec les pains de la boulangerie mariathe"
                className="img img2"
              />
            </div>
          </div>
          <div className="outer" data-aos="fade-up">
            <div className="container">
              <div className="left">
                <img
                  src={ASSETS.BAKERY4}
                  alt="Nous proposons une variété de pains, viennoiseries,
                  pâtisseries raffinées, et notre service de Cène aux églises."
                  className="img"
                />
              </div>
              <div className="right">
                <h1 className="title t-1">
                  Savourez chaque instant avec les délices de Mariathe
                </h1>
                <p className="title t-3">
                  Nous proposons une variété de pains, viennoiseries,
                  pâtisseries raffinées, et notre service de Cène aux églises.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="meal-section">
          <div className="container">
            <div className="meal-description">
              <h1 className="title t-1">La Cène</h1>
              <p className="title t-3">
                Nous offrons une solution <strong>Tout-En-Un</strong> incluant
                du pain, du vin, ou du jus selon les préférences de votre
                congrégration. <br />
                Une première en RDC, nos gobelets de communion sont désormais
                fabriqués localement à Kinshasa, garantissant frâicheur et
                qualité pour chaque célebration.
              </p>
            </div>
            <div>
              <img
                src={ASSETS.HANDS}
                alt="Nous offrons une solution Tout-En-Un incluant
                du pain, du vin, ou du jus selon les préférences de votre
                congrégration.
                Une première en RDC, nos gobelets de communion sont désormais
                fabriqués localement à Kinshasa, garantissant frâicheur et
                qualité pour chaque célebration"
              />
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
              <img
                src={ASSETS.AIRTEL_MONEY}
                alt="Paiement simplifié avec mobile money via airtel money"
              />
              <img
                src={ASSETS.ORANGE_MONEY}
                alt="Paiement simplifié avec mobile money via orange money"
                className="orange"
              />
              <img
                src={ASSETS.M_PESA}
                alt="Paiement simplifié avec mobile money via m-pesa"
              />
              <img
                src={ASSETS.MASTERCARD}
                alt="Paiement simplifié avec votre carte mastercard"
              />
              <img
                src={ASSETS.VISA}
                alt="Paiement simplifié avec votre carte visa"
              />
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
                <h2 className="title t-2">Produits Frais et Savoureux</h2>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <IoBagCheckOutline className="icon" />
                </div>
                <h2 className="title t-2">Innovation et Qualité</h2>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <FaMedal className="icon" />
                </div>
                <h2 className="title t-2">Service Chaleureux</h2>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <MdSwitchAccessShortcutAdd className="icon" />
                </div>
                <h2 className="title t-2">Produits Accessible à tous</h2>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <CgCommunity className="icon" />
                </div>
                <h2 className="title t-2">Au Service de la Communauté</h2>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <FaUniregistry className="icon" />
                </div>
                <h2 className="title t-2">Saveur Unique</h2>
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
                  <img
                    src={ASSETS.BAKERY5}
                    alt="Pain carré, boule, pistolet, baguette, et tant d'autres...
                  Des pains doux, moelleux, et croustillants idéal pour
                  accompagner vos répas, et vos manisfestations."
                    className="img"
                  />
                </div>
                <h2 className="title t-2">Nos Pains</h2>
                <p className="title t-3">
                  Pain carré, boule, pistolet, baguette, et tant d'autres...{" "}
                  <br />
                  Des pains doux, moelleux, et croustillants idéal pour
                  accompagner vos répas, et vos manisfestations.
                </p>
              </div>
              <div className="item">
                <h2 className="title t-2">Viennoiseries</h2>
                <p className="title t-3">
                  Croissants, Brioches, Pain au Chocolat, Pain au Raisin, et
                  tant d'autres... <br />
                  Lègers, Feuilletés, et Moelleuses se dégustent à tout moment
                  de la journée.
                </p>
                <div className="img-wrapper down">
                  <img
                    src={ASSETS.mariathe_viennoiseries}
                    alt="Croissants, Brioches, Pain au Chocolat, Pain au Raisin, et
                  tant d'autres...
                  Lègers, Feuilletés, et Moelleuses se dégustent à tout moment
                  de la journée."
                    className="img"
                  />
                </div>
              </div>
              <div className="item">
                <div className="img-wrapper up">
                  <img
                    src={ASSETS.samosa_viande}
                    alt="Au poulet, à la Viande, et tant d'autres...
                  Une garniture épicée et savoureux pour tout types d'occasions."
                    className="img"
                  />
                </div>
                <h2 className="title t-2">Sandwichs et Samoussas</h2>
                <p className="title t-3">
                  Au poulet, à la Viande, et tant d'autres... <br />
                  Une garniture épicée et savoureux pour tout types d'occasions.
                </p>
              </div>
              <div className="item">
                <div className="img-wrapper up">
                  <img
                    src={ASSETS.cake}
                    alt="Gâteau, Éclair, Tarte, et tant d'autres...
                  Des créations sucrées pour toute les occasions avec les
                  ingredients frais."
                    className="img"
                  />
                </div>
                <h2 className="title t-2">Pâtisserie</h2>
                <p className="title t-3">
                  Gâteau, Éclair, Tarte, et tant d'autres... <br />
                  Des créations sucrées pour toute les occasions avec les
                  ingredients frais.
                </p>
              </div>
              <div className="item">
                <h2 className="title t-2">La Cène</h2>
                <p className="title t-3">
                  Coupe de vin (du vin sacramentel de haute qualité), Hosties
                  (des hosties fraiches et délicates prêtes à être utilisées
                  pour la cène)
                </p>
                <div className="img-wrapper down">
                  <img
                    src={ASSETS.communion}
                    alt="Coupe de vin (du vin sacramentel de haute qualité), Hosties
                  (des hosties fraiches et délicates prêtes à être utilisées
                  pour la cène)"
                    className="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="faqs">
          <div className="container">
            <div className="faq-head">
              <h2 className="title t-2">Questions Fréquemment Posées</h2>
              <p className="title t-3">
                Trouvez les réponses rapidement aux questions que vous pourriez
                avoir.
              </p>
            </div>
            <div className="faq-content">
              <div className="faq-item">
                <span>
                  <GrScheduleNew className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Quels sont vos horaires d'ouverture ?
                  </h3>
                  <p className="title t-4">
                    Nous sommes ouverts du lundi au dimanche de 6h00 à 22h00.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <FaMapLocationDot className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">Où êtes-vous situés ?</h3>
                  <p className="title t-4">
                    Notre boulangerie Mariathe se trouve à Kinshasa, au nº 04,
                    Av. Assossa; C. Ngiri-Ngiri; Ref. Lycée Movenda; Kinshasa -
                    RDC.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <TbLayersDifference className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Quels types de pain proposez-vous ?
                  </h3>
                  <p className="title t-4">
                    Nous proposons une variété de pains, y compris du pain
                    carré, de la boule, des baguettes, et des pistolets.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <BiSolidOffer className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Offrez-vous des options sans gluten ?
                  </h3>
                  <p className="title t-4">
                    Oui, nous avons une sélection de pains et pâtisseries sans
                    gluten. N'hésitez pas à demander notre menu sans gluten en
                    magasin.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <FaFirstOrderAlt className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Puis-je passer une commande spéciale pour un événement ?
                  </h3>
                  <p className="title t-4">
                    Absolument ! Nous acceptons les commandes spéciales pour les
                    événements tels que les anniversaires, mariages, et autres
                    célébrations. Veuillez nous contacter au moins 48 heures à
                    l'avance.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <GrProductHunt className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Proposez-vous des produits pour la Cène ?
                  </h3>
                  <p className="title t-4">
                    Oui, nous avons une gamme d'articles pour la Cène, y compris
                    des coupes de vin et des hosties, spécialement préparés pour
                    répondre aux besoins des églises et des communautés.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <FcAdvertising className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Avez-vous des promotions en cours ?
                  </h3>
                  <p className="title t-4">
                    Nous avons régulièrement des promotions et des offres
                    spéciales. Consultez notre page Promotions sur le site web
                    ou suivez-nous sur les réseaux sociaux pour rester informé.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <MdOutlineBorderColor className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Puis-je passer commande en ligne ?
                  </h3>
                  <p className="title t-4">
                    Oui, vous pouvez passer commande en ligne via notre page
                    "Commander" sur le site. Vous pouvez choisir de récupérer
                    votre commande en magasin ou opter pour la livraison.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <SiVega className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Proposez-vous des options végétariennes ?
                  </h3>
                  <p className="title t-4">
                    Oui, nous proposons des options végétariennes, y compris des
                    sandwichs aux œufs, des viennoiseries, et des pâtisseries
                    sans viande.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <SiElement className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Utilisez-vous des ingrédients locaux ?
                  </h3>
                  <p className="title t-4">
                    Nous privilégions l'utilisation d'ingrédients locaux et de
                    saison autant que possible pour soutenir notre communauté et
                    garantir la fraîcheur de nos produits.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <MdConnectWithoutContact className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Comment puis-je vous contacter ?
                  </h3>
                  <p className="title t-4">
                    Vous pouvez nous contacter par téléphone au +243 83 53 17
                    807, par email à contact@mariathe.com, ou via notre
                    formulaire de contact sur le site.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <span>
                  <SiPicpay className="icon" />
                </span>
                <div className="faq-item-desc">
                  <h3 className="title t-3">
                    Quels modes de paiement acceptez-vous ?
                  </h3>
                  <p className="title t-4">
                    Nous acceptons les paiements en espèces, par carte bancaire,
                    et via les principales applications de paiement mobile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="news-letter">
          <div className="container">
            <div className="inner">
              <img
                src={ASSETS.BAKERY8}
                alt="Mariathe est une boulangerie spécialisée dans les pains
                  artisanaux fabriqués avec les ingrédients les plus frais et
                  les plus fins"
                className="img"
              />
            </div>
            <div className="outer">
              <h3 className="title t-2">
                Inscrivez-vous pour obtenir des codes de réduction intéressants
              </h3>
              <p className="title t-3">
                Nous pensons que le bon pain est plus qu'un simple aliment,
                c'est une expérience.
              </p>
              {isShowingMessage && (
                <MessageBox type={message.type} text={message.text} />
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="tapez votre adresse e-mail"
                  {...register("mail")}
                  style={{
                    border: errors.mail ? "3px solid red" : "unset",
                  }}
                />
                {isSending ? (
                  <span>subscription...</span>
                ) : (
                  <button type="submit" className="button">
                    S'Inscrire!
                  </button>
                )}
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
