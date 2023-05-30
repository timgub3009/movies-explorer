import React from "react";
import { Link } from "react-router-dom";
import clickingLogo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={clickingLogo} alt="Эмблема сайта" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__list-item">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              to="/signin"
              className="header__link header__link_type_bright"
            >
              Войти
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
