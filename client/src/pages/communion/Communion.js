import React, { useState, useRef } from "react";
import "./communion.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
//
import { BsDashCircleDotted } from "../../middlewares/icons";
import { Link } from "react-router-dom";
//
import ASSETS from "../../utils/Assets";

const Communion = () => {
  const [fix, setFix] = useState(false);

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

  return (
    <div
      className="communion-wrapper"
      ref={scrollDemoRef}
      onScroll={fixedOnscroll}
    >
      <Header fix={fix} />
      <div className="communion-body">
        <div className="communion-body-content">
          <h1 className="title t-1">La Cène</h1>
          <hr />
          <div className="communion-meal">
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
          <p className="title t-3">
            "La Cène est un moment sacré de communion au sein des églises et
            communautés chrétiennes. Chez Mariathe, nous avons mis en place un
            service innovant et pratique pour les églises et communautés : La
            Cène. Nous offrons une solution tout-en-un incluant du pain hostie,
            du vin, du jus de raisin ou du sucré gazeux (Vitalo), selon les
            préférences de votre congrégation. Nos gobelets de communion
            préremplis sont désormais fabriqués localement à Kinshasa, une
            première en RDC, garantissant fraîcheur et qualité pour chaque
            célébration."
          </p>
          <div className="option">
            <h2 className="title t-2">
              <BsDashCircleDotted className="icon" />
              <span>Produits</span>
            </h2>
            <div className="row">
              <h3 className="title t-3">Coupes de Communion Préremplies</h3>
              <p className="title t-4">
                "Nos coupes de communion traditionnelles préremplies comprennent
                une hostie et 5 ml de vin, jus de raisin ou Vitalo, selon votre
                choix. Chaque hostie est composée de farine pure et d'eau, sans
                sel ni levain, pour respecter les traditions sacrées."
              </p>
            </div>
            <div className="row">
              <h3 className="title t-3">Personnalisation</h3>
              <p className="title t-4">
                "Nous travaillons en étroite collaboration avec chaque église
                pour personnaliser la teneur du vin, sa dilution ou son mélange.
                Chaque détail est discuté avec soin pour s'assurer que vos
                besoins spirituels sont parfaitement respectés."
              </p>
            </div>
          </div>
          <div className="option">
            <h2 className="title t-2">
              <BsDashCircleDotted className="icon" />
              <span>Avantages de La Cène</span>
            </h2>
            <div className="row">
              <h3 className="title t-3">Fabrication Locale</h3>
              <p className="title t-4">
                "Grâce à notre nouvelle machine, nous fabriquons localement à
                Kinshasa des gobelets de communion préremplis, une première en
                RDC. Ce processus nous permet de garantir une fraîcheur inégalée
                et une disponibilité immédiate."
              </p>
            </div>
            <div className="row">
              <h3 className="title t-3">Facilité d'Utilisation</h3>
              <p className="title t-4">
                "Nos gobelets préremplis sont faciles à utiliser, avec un film
                supérieur pour accéder à l'hostie et un joint en aluminium pour
                le liquide. Leur ouverture est simple et silencieuse, idéale
                pour une célébration respectueuse et paisible."
              </p>
            </div>
            <div className="row">
              <h3 className="title t-3">Durée de Conservation</h3>
              <p className="title t-4">
                "Chaque coupe de communion a une durée de conservation de 12
                mois à partir de la date de fabrication. Les produits sont
                emballés avec soin pour garantir leur fraîcheur jusqu'à la
                prochaine utilisation."
              </p>
            </div>
            <div className="row">
              <h3 className="title t-3">Aucun Gaspillage</h3>
              <p className="title t-4">
                "La Cène vous permet d'utiliser uniquement ce dont vous avez
                besoin pour chaque service. Le reste peut être conservé pour une
                autre célébration. Les gobelets en plastique sont recyclables,
                contribuant ainsi à un environnement plus sain."
              </p>
            </div>
            <div className="row">
              <h3 className="title t-3">Personnalisation</h3>
              <p className="title t-4">
                Choisissez entre vin, jus de raisin ou Vitalo selon les
                préférences de votre églises.
              </p>
            </div>
          </div>
          <div className="option">
            <h2 className="title t-2">
              <BsDashCircleDotted className="icon" />
              <span>Quantités Disponibles</span>
            </h2>
            <div className="row">
              <h3 className="title t-3">
                Options de Conditionnement (100 pièces, 250 pièces, 1000 pièces)
              </h3>
              <p className="title t-4">
                "Que vous organisiez un petit service ou une grande cérémonie,
                nous avons le format adapté à vos besoins. Les cartons sont
                étiquetés avec la date de fabrication et la date limite
                d'utilisation pour garantir la qualité."
              </p>
            </div>
          </div>
          <div className="option">
            <h2 className="title t-2">
              <BsDashCircleDotted className="icon" />
              <span>Commandes et Livraison</span>
            </h2>
            <div className="row">
              <h3 className="title t-3">Commande Rapide</h3>
              <p className="title t-4">
                "Les commandes de La Cène sont expédiées sous 48 heures. Grâce à
                notre production locale, nous disposons de stocks suffisants
                pour répondre rapidement à vos besoins."
              </p>
            </div>
            <div className="row">
              <h3 className="title t-3">Contact</h3>
              <p className="title t-4">
                "Pour passer commande ou discuter de vos besoins spécifiques,
                contactez-nous au <strong>+243 83 53 17 807</strong> ou par
                email à <strong>cene@mariathe.com</strong>. Vous pouvez
                également visiter notre site web{" "}
                <Link to={"/"} blanc="">
                  www.mariathe.com
                </Link>{" "}
                pour plus d'informations."
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communion;
