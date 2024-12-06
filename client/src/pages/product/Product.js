import React, { useState, useRef } from "react";
import "./product.css";
import { Helmet } from "react-helmet";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
//
import ASSETS from "../../utils/Assets";

const Product = () => {
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
    <>
      <Helmet>
        <title>Nos Pains - Mariathe : Boulangerie Artisanale</title>
        <meta
          name="description"
          content="Découvrez notre sélection de produits (pains, gâteaux, etc.) artisanaux, fabriqués avec des ingrédients locaux."
        />
      </Helmet>
      <div
        className="product-wrapper"
        ref={scrollDemoRef}
        onScroll={fixedOnscroll}
      >
        <Header fix={fix} />
        <div className="product-body">
          <div className="product-body-content">
            <h1 className="title t-1">Nos Produits</h1>
            <hr />
            <div className="content-items">
              <div className="product-item">
                <h2 className="title t-2">• Pain</h2>
                <div className="pi-desc">
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.squareBread}
                      alt="Un pain doux et moelleux, parfait pour les tartines du
                      matin ou les sandwichs."
                    />
                    <h3 className="title t-3">Carré </h3>
                    <p className="title t-4">
                      Un pain doux et moelleux, parfait pour les tartines du
                      matin ou les sandwichs.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.boulBread}
                      alt="Un pain rustique avec une croûte croustillante et une mie
                      aérée, idéal pour accompagner vos repas."
                    />
                    <h3 className="title t-3">Boule</h3>
                    <p className="title t-4">
                      Un pain rustique avec une croûte croustillante et une mie
                      aérée, idéal pour accompagner vos repas.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.baguettesBread}
                      alt="Classiques et croustillantes, nos baguettes sont parfaites
                      pour tous vos repas."
                    />
                    <h3 className="title t-3">Baguettes</h3>
                    <p className="title t-4">
                      Classiques et croustillantes, nos baguettes sont parfaites
                      pour tous vos repas.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.pistoletBread}
                      alt="Petit pain belge, idéal pour les collations ou les petits
                      déjeuners gourmands."
                    />
                    <h3 className="title t-3">Pistolet</h3>
                    <p className="title t-4">
                      Petit pain belge, idéal pour les collations ou les petits
                      déjeuners gourmands.
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <h2 className="title t-2">• Viennoiseries</h2>
                <div className="pi-desc">
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.v_croissants}
                      alt="Légers et feuilletés, nos croissants sont parfaits pour
                      commencer la journée."
                    />
                    <h3 className="title t-3">Croissant </h3>
                    <p className="title t-4">
                      Légers et feuilletés, nos croissants sont parfaits pour
                      commencer la journée.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.v_brioches}
                      alt="Moelleuses et légèrement sucrées, nos brioches se
                      dégustent à tout moment de la journée."
                    />
                    <h3 className="title t-3">Brioches</h3>
                    <p className="title t-4">
                      Moelleuses et légèrement sucrées, nos brioches se
                      dégustent à tout moment de la journée.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.viennoiseries}
                      alt="Moelleuses et légèrement sucrées, nos brioches se
                      dégustent à tout moment de la journée."
                    />
                    <h3 className="title t-3">Et tant d’autres…</h3>
                    <p className="title t-4">A la spécialitée locale...</p>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <h2 className="title t-2">• Sandwichs</h2>
                <div className="pi-desc">
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.s_oeufs}
                      alt="Des morceaux de poulet tendre avec une garniture fraîche."
                    />
                    <h3 className="title t-3">Au poulet</h3>
                    <p className="title t-4">
                      Des morceaux de poulet tendre avec une garniture fraîche.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.s_jambon}
                      alt="Un classique indémodable avec du jambon de qualité."
                    />
                    <h3 className="title t-3">Jambon</h3>
                    <p className="title t-4">
                      Un classique indémodable avec du jambon de qualité.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.s_egg}
                      alt="Un mélange savoureux d'œufs frais et d'épices."
                    />
                    <h3 className="title t-3">Œufs</h3>
                    <p className="title t-4">
                      Un mélange savoureux d'œufs frais et d'épices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <h2 className="title t-2">• Samoussa</h2>
                <div className="pi-desc">
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.samosa_viande}
                      alt="Une garniture épicée de viande hachée enveloppée dans une
                      pâte croustillante."
                    />
                    <h3 className="title t-3">Viande</h3>
                    <p className="title t-4">
                      Une garniture épicée de viande hachée enveloppée dans une
                      pâte croustillante.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.samosa_poulet}
                      alt="Des morceaux de poulet épicé enveloppés dans une pâte
                      dorée."
                    />
                    <h3 className="title t-3">Poulet</h3>
                    <p className="title t-4">
                      Des morceaux de poulet épicé enveloppés dans une pâte
                      dorée.
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <h2 className="title t-2">• Pâtisserie</h2>
                <div className="pi-desc">
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.cake}
                      alt="Des créations sucrées pour toutes les occasions."
                    />
                    <h3 className="title t-3">Gâteau</h3>
                    <p className="title t-4">
                      Des créations sucrées pour toutes les occasions.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.eclairs}
                      alt="Une pâte à choux remplie de crème et nappée de glaçage."
                    />
                    <h3 className="title t-3">Éclair</h3>
                    <p className="title t-4">
                      Une pâte à choux remplie de crème et nappée de glaçage.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.tarte}
                      alt="Des tartes aux fruits et au chocolat, faites maison avec
                      des ingrédients frais."
                    />
                    <h3 className="title t-3">Tarte</h3>
                    <p className="title t-4">
                      Des tartes aux fruits et au chocolat, faites maison avec
                      des ingrédients frais.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    {/* <img src="" alt="p-item" /> */}
                    <h3 className="title t-3">Et tant d’autres…</h3>
                    <p className="title t-4">A la spécialitée locale...</p>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <h2 className="title t-2">• Cène</h2>
                <div className="pi-desc">
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.cup_of_wine2}
                      alt="Du vin sacramentel de haute qualité."
                    />
                    <h3 className="title t-3">Coupe de vin</h3>
                    <p className="title t-4">
                      Du vin sacramentel de haute qualité.
                    </p>
                  </div>
                  <div className="pi-desc-item">
                    <img
                      src={ASSETS.hosties}
                      alt="Des hosties fraîches et délicates, prêtes à être utilisées
                      pour la Cène."
                    />
                    <h3 className="title t-3">Hosties</h3>
                    <p className="title t-4">
                      Des hosties fraîches et délicates, prêtes à être utilisées
                      pour la Cène.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Product;
