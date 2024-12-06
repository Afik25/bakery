import React from "react";
import "./about.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <div className="about-wrapper">
      <Header />
      <div className="about-body">
        <div className="about-body-content">
          <h1 className="title t-1">À propos de nous</h1>
          <hr />
          <p className="title t-3">
            L'idée de créer cette boulangerie est née de notre passion pour la
            qualité. Nous avons rêvé d'un lieu où les gens pourraient se
            retrouver pour partager un pain chaud, une viennoiserie, tout en
            savourant une boisson de leur choix. À côté de cela, nous voulions
            un espace de production capable de répondre aux besoins de la
            population (écoles, églises, commerces, entreprises, etc.). 
            <br/>
            <br/>
            Notre boulangerie ne se limite pas à la vente de pains et de pâtisseries.
            Nous offrons également un service dédié à la production des articles
            de la Cène, répondant ainsi aux besoins des églises et des
            communautés. Grâce à cette initiative, nous espérons alléger le
            fardeau de ceux qui préparent la Sainte Cène, tout en garantissant
            la qualité et la disponibilité des produits nécessaires à cette
            pratique sacrée. 
            <br/>
            <br/>
            Ainsi, chez Mariathe, nous nous engageons à offrir
            des produits de qualité et un service irréprochable, que ce soit
            pour les besoins quotidiens de notre clientèle ou pour des occasions
            spéciales comme la Cène.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
