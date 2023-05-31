import React from "react";
import "./Portfolio.css";
import index from "../../images/index.svg";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/timgub3009/how-to-learn"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <img
              className="portfolio__link-image"
              src={index}
              alt="Кликабельная стрелка для перехода на сайт"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/timgub3009/russian-travel"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img
              className="portfolio__link-image"
              src={index}
              alt="Кликабельная стрелка для перехода на сайт"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/timgub3009/react-mesto-api-full-gha"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img
              className="portfolio__link-image"
              src={index}
              alt="Кликабельная стрелка для перехода на сайт"
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
