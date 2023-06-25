import React, { useEffect } from "react";
import "./Profile.css";
import useFormValidation from "../../hooks/useFormValidation";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Profile = ({ onUpdateUser, onLogout }) => {
  useDocumentTitle("Аккаунт");

  const currentUser = useCurrentUser();

  const { values, setValues, handleChange, errors, resetValidation, isValid } =
    useFormValidation({ name: currentUser.name, email: currentUser.email });

  React.useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser.name, currentUser.email]);

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    const { name, email } = values;
    onUpdateUser(name, email);
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
            minLength="2"
            maxLength="30"
            required
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
            minLength="2"
            maxLength="30"
            required
          />
        </label>
        <span
          id="profile-error"
          className={`profile__error ${
            (errors.email || errors.name) && "profile__error_active"
          }`}
        >
          Профиль нельзя обновить, проверьте правильность введённых данных
        </span>
        <div className="profile__buttons">
          <button
            className="profile__link"
            type="submit"
            disabled={
              (currentUser.name === values.name.trim() &&
                currentUser.email === values.email.trim()) ||
              !isValid
            }
          >
            Редактировать
          </button>
          <button
            className="profile__link profile__link_type_signout"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
