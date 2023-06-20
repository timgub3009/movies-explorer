import React from "react";
import loginLogo from "../../images/logo.svg";
import { NavLink, Link } from "react-router-dom";
import "./Login.css";
import useFormValidation from "../../hooks/useFormValidation";

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, resetValidation, isValid } =
    useFormValidation({});

  React.useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    const { email, password } = values;
    onLogin(email, password);
  }

  return (
    <section className="signin">
      <div className="signin__container">
        <Link to="/">
          {" "}
          <img src={loginLogo} alt="Эмблема сайта" className="signin__logo" />
        </Link>
        <h2 className="signin__heading">Рады видеть!</h2>
        <form className="signin__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="signin__label">
            <span className="signin__placeholder">E-mail</span>
            <input
              className="signin__input"
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
          <label htmlFor="password" className="signin__label">
            <span className="signin__placeholder">Пароль</span>
            <input
              className="signin__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength="7"
              maxLength="14"
              value={values.password}
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
          <button type="submit" className="signin__button" disabled={!isValid}>
            Войти
          </button>
        </form>
        <p className="signin__question">
          Еще не зарегистрированы?&nbsp;
          <NavLink to="/signup" className="signin__link">
            Регистрация
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
