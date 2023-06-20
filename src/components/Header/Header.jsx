import React from "react";
import { Link } from "react-router-dom";
import clickingLogo from "../../images/logo.svg";
import "./Header.css";
import NavigationUnauthorized from "../NavigationUnauthorized/NavigationUnauthorized";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn, windowWidth }) => {
  return (
    <header className={`header ${!loggedIn ? "header_type_unauthorized" : ""}`}>
      <Link to="/" className="header__link">
        <img src={clickingLogo} alt="Эмблема сайта" className="header__logo" />
      </Link>
      {loggedIn && <Navigation windowWidth={windowWidth} />}
      {!loggedIn && <NavigationUnauthorized />}
    </header>
  );
};

export default Header;
