import React from "react";
import registerLogo from "../../images/logo.svg";
import { NavLink, Link } from "react-router-dom";
import "./Register.css";
import useFormValidation from "../../hooks/useFormValidation";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Register = ({ onRegister }) => {
  useDocumentTitle("Регистрация");

  const { values, handleChange, errors, resetValidation, isValid } =
    useFormValidation({});

  React.useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    const { name, email, password } = values;
    onRegister(name, email, password);
  }

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
        <form className="signup__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="signup__label">
            <span className="signup__placeholder">Имя</span>
            <input
              className="signup__input"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            <span
              id="name-error"
              className={`popup__error ${errors.name && "popup__error_active"}`}
            >
              {errors.name || ""}
            </span>
          </label>
          <label htmlFor="email" className="signup__label">
            <span className="signup__placeholder">E-mail</span>
            <input
              className="signup__input"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              minLength="2"
              maxLength="30"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span
              id="email-error"
              className={`popup__error ${
                errors.email && "popup__error_active"
              }`}
            >
              {errors.email || ""}
            </span>
          </label>
          <label htmlFor="password" className="signup__label">
            <span className="signup__placeholder">Пароль</span>
            <input
              className="signup__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="7"
              maxLength="14"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span
              id="email-error"
              className={`popup__error ${
                errors.password && "popup__error_active"
              }`}
            >
              {errors.password || ""}
            </span>
          </label>
          <button type="submit" className="signup__button" disabled={!isValid}>
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
