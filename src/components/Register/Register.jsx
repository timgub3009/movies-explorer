import React from "react";
import registerLogo from "../../images/logo.svg";
import { NavLink, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  return (
    <section className="signup">
      <div className="signup__container">
        <Link to="/">
          {" "}
          <img
            src={registerLogo}
            alt="Эмблема сайта"
            className="signup__logo"
          />
        </Link>
        <h2 className="signup__heading">Добро пожаловать!</h2>
        <form className="signup__form">
          <label htmlFor="" className="signup__label">
            <span className="signup__placeholder">Имя</span>
            <input
              className="signup__input"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
            <span id="email-error" className="popup__error">
              Что-то пошло не так
            </span>
          </label>
          <label htmlFor="" className="signup__label">
            <span className="signup__placeholder">E-mail</span>
            <input
              className="signup__input"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              minLength="2"
              maxLength="30"
              required
            />
            <span id="email-error" className="popup__error">
              Что-то пошло не так
            </span>
          </label>
          <label htmlFor="" className="signup__label">
            <span className="signup__placeholder">Пароль</span>
            <input
              className="signup__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="7"
              maxLength="14"
              required
            />
            <span id="email-error" className="popup__error">
              Что-то пошло не так
            </span>
          </label>
          <button type="submit" className="signup__button">
            Зарегистрироваться
          </button>
        </form>
        <p className="signup__question">
          Уже зарегистрированы?&nbsp;
          <NavLink to="/signin" className="signup__link">
            Войти
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Register;
