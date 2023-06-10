import React from "react";
import promologo from "../../images/promo_logo.svg";
import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__heading">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img
          src={promologo}
          alt="Красивый узор для украшения страницы"
          className="promo__image"
        />
      </div>
    </section>
  );
};

export default Promo;
