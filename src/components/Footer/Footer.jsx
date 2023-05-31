import React from "react";
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__heading">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__text">&copy;&nbsp;{currentYear}</p>
        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__list-item">
              <a
                href="https://practicum.yandex.ru/profile/web/"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a href="https://github.com/timgub3009" className="footer__link">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
