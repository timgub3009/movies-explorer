import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({ image, duration, nameRU }) => {
  const [isSaved, setIsSaved] = React.useState(false);

  const handleLikes = () => {
    if (!isSaved) setIsSaved(true);
    else {
      setIsSaved(false);
    }
  };

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  const time = getTimeFromMins(duration);

  return (
    <li className="cards__item">
      <img
        src={`https://api.nomoreparties.co/${image.url}`}
        alt={nameRU}
        className="cards__item-image"
      ></img>
      <div className="cards__item-info">
        <p className="cards__item-title">{nameRU}</p>
        <button
          className={`cards__item-likebutton ${
            isSaved
              ? "cards__item-likebutton_type_active"
              : "cards__item-likebutton_type_inactive"
          } `}
          onClick={handleLikes}
        />
      </div>
      <p className="cards__item-duration">{time}</p>
    </li>
  );
};

export default MoviesCard;
