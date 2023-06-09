import React from "react";
import { Link } from "react-router-dom";
import clickingLogo from "../../images/logo.svg";
import "./Header.css";
import NavigationUnauthorized from "../NavigationUnauthorized/NavigationUnauthorized";
import Navigation from "../Navigation/Navigation";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Header = ({ windowWidth }) => {
  const currentUser = useCurrentUser();
  const isCurrentUserLoggedIn = currentUser != null;

  return (
    <header
      className={`header ${
        isCurrentUserLoggedIn ? "" : "header_type_unauthorized"
      }`}
    >
      <Link to="/" className="header__link">
        <img src={clickingLogo} alt="Эмблема сайта" className="header__logo" />
      </Link>
      {isCurrentUserLoggedIn ? (
        <Navigation windowWidth={windowWidth} />
      ) : (
        <NavigationUnauthorized />
      )}
    </header>
  );
};

export default Header;
