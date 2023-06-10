import React from "react";
import avatar from "../../images/personal_photo.jpeg";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__heading">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__description">
            <h3 className="about-me__title">Губейдулин Тимур</h3>
            <p className="about-me__subtitle">Веб-разработчик, 30 лет</p>
            <p className="about-me__content">
              Родился и живу в Москве. Закончил факультет иностранных языков в
              государственном ВУЗе. Люблю читать, смотреть футбол, слушать
              музыку, учить иностранные языки и, с недавнего времени,
              программирование.
            </p>
            <a
              href="https://github.com/timgub3009"
              className="about-me__link"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>

          <img
            className="about-me__photo"
            src={avatar}
            alt="Фотография автора сайта"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
