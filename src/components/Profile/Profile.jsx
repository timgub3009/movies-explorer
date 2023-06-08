import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className="profile">
      <h2 className="profile__heading">Привет, Тимур!</h2>
      <form className="profile__form">
        <label htmlFor="name" className="profile__label">
          <span className="profile__placeholder">Имя</span>
          <input
            type="text"
            id="name"
            className="profile__input"
            defaultValue="Тимур"
          />
        </label>
        <label htmlFor="email" className="profile__label">
          <span className="profile__placeholder">E-mail</span>
          <input
            type="email"
            id="email"
            className="profile__input"
            defaultValue="timur3009@yandex.ru"
          />
        </label>
      </form>
      <div className="profile__buttons">
        <Link to="/profile" className="profile__link">
          Редактировать
        </Link>
        <Link to="/" className="profile__link profile__link_type_signout">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
};

export default Profile;
