import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/acc_icon.svg';

const Navigation = () => {
  return (
    <nav className="navigation">
    <ul className="navigation__list">
      <li className="navigation__list-item">
        <NavLink to="/movies" className="navigation__link">
          Фильмы
        </NavLink>
      </li>
      <li className="navigation__list-item">
        <NavLink
          to="/saved-movies"
          className="navigation__link"
        >
          Сохранённые фильмы
        </NavLink>
      </li>
      <li className="navigation__list-item navigation__list-item_type_profile">
        <NavLink
          to="/profile"
          className="navigation__link navigation__link_type_profile"
        >
          <span className='navigation__profile-subtext'>Аккаунт</span>
          <img className="navigation__profile-icon" src={icon} alt="Кликабельная иконка профиля" />
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default Navigation;