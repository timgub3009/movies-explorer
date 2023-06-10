import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="about-project">
      <div className="about-project__wrapper">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__paragraphs">
          <div className="about-project__paragraph">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__paragraph">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__bars">
          <span className="about-project__bar about-project__bar_type_green">
            1 неделя
          </span>
          <span className="about-project__bar">4 недели</span>
        </div>
        <div className="about-project__subbar">
          <span className="about-project__bar-text">Back-end</span>
          <span className="about-project__bar-text">Front-end</span>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
