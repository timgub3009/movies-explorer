import React from "react";
import avatar from "../../images/personal_photo.jpeg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__descripton">
          <h3 className="about-me__title">Губейдулин Тимур</h3>
          <p className="about-me__subtitle">Веб-разработчик, 30 лет</p>
          <p className="about-me__content">
            Родился и живу в Москве. Закончил факультет иностранных языков в
            государственном ВУЗе. Люблю читать, смотреть футбол, слушать музыку,
            учить иностранные языки и, с недавнего времени, программирование.
          </p>
          <a href="https://github.com/timgub3009" className="about-me__link">
            GitHub
          </a>
        </div>

        <img
          className="about-me__photo"
          src={avatar}
          alt="Фотография автора сайта"
        />
      </div>
    </section>
  );
};

export default AboutMe;
