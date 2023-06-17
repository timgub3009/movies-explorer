import React, { useContext, useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({updateUser, logout}) => {

  const currentUser = useContext(CurrentUserContext);

  const {values, setValues, handleChange, errors, resetValidation, isValid} = useFormValidation({});

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [setValues, currentUser.name, currentUser.email])

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    const {name, email} = values;
    updateUser(name, email);
  } 

  return (
    <section className="profile">
      <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="profile__label">
          <span className="profile__placeholder">Имя</span>
          <input
            type="text"
            id="name"
            name="name"
            className="profile__input"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email" className="profile__label">
          <span className="profile__placeholder">E-mail</span>
          <input
            type="email"
            id="email"
            name="email"
            className="profile__input"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <div className="profile__buttons">
        <button className="profile__link" type='submit'>
          Редактировать
        </button>
        <button className="profile__link profile__link_type_signout" onClick={logout}> 
          Выйти из аккаунта
        </button>
      </div>
      </form>
    </section>
  );
};

export default Profile;
