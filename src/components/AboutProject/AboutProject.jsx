import React from "react";

const AboutProject = () => {
  return (
    <section className="about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <div className="about-project__paragraphs">
        <h3 className="about-project__heading">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__paragraph">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="about-project__heading">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__paragraph">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__bars">
        <div className="about-project__bar about-project__bar_type_green">
          <h4 className="about-project__bar-heading">1 неделя</h4>
          <span className="about-project__bar-text">Back-end</span>
        </div>
        <div className="about-project_bar">
          <h4 className="about-project__bar-heading">4 недели</h4>
          <span className="about-project__bar-text">Front-end</span>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
