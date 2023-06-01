import loginLogo from "../../images/logo.svg";
import { NavLink, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <section className="signin">
      <div className="signin__container">
        <Link to="/">
          {" "}
          <img
            src={loginLogo}
            alt="Эмблема сайта"
            className="signin__logo"
          />
        </Link>
        <h2 className="signin__heading">Рады видеть!</h2>
        <form className="signin__form">
          <label htmlFor="" className="signin__label">
            <span className="signin__placeholder">E-mail</span>
            <input
              className="signin__input"
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
          <label htmlFor="" className="signin__label">
            <span className="signin__placeholder">Пароль</span>
            <input
              className="signin__input"
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
          <button type="submit" className="signin__button">
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