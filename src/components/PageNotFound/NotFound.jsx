import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("Страница не найдена");

  const navigate = useNavigate();
  const onBackClick = () => navigate(-1);

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <button className="not-found__button" onClick={onBackClick}>
        Назад
      </button>
    </div>
  );
};

export default NotFound;
