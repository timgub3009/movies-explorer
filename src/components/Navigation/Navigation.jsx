import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";
import icon from "../../images/acc_icon.svg";
import PopupMenu from "../PopupMenu/PopupMenu";

const Navigation = ({ windowWidth }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
    else {
      setIsOpen(false);
    }
  };

  return (
    <nav className="navigation">
      {windowWidth > 800 && (
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <NavLink
              to="/movies"
              className={`navigation__link ${
                location.pathname === "/movies" ? "navigation__link_active" : ""
              }`}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink
              to="/saved-movies"
              className={`navigation__link ${
                location.pathname === "/saved-movies"
                  ? "navigation__link_active"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navigation__list-item navigation__list-item_type_profile">
            <NavLink
              to="/profile"
              className={`navigation__link navigation__link_type_profile ${
                location.pathname === "/profile" ? "navigation__link_active" : ""
              }`}
            >
              <span className="navigation__profile-subtext">Аккаунт</span>
              <img
                className="navigation__profile-icon"
                src={icon}
                alt="Кликабельная иконка профиля"
              />
            </NavLink>
          </li>
        </ul>
      )}
      {windowWidth <= 800 && (
        <button
          className="navigation__burger-menu"
          onClick={handleClick}
        ></button>
      )}
      <PopupMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navigation;
