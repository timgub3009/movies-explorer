import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({ image, duration, nameRU, isSaved }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isToRemove, setIsToRemove] = React.useState(false);

  const handleLikes = () => {
    if (!isLiked) setIsLiked(true);
    else {
      setIsLiked(false);
    }
  };

  const handleMouseOver = () => {
    setIsToRemove(true);
  };

  const handleMouseOut = () => {
    setIsToRemove(false);
  };

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  const time = getTimeFromMins(duration);

  return (
    <li
      className="cards__item"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <img
        src={`https://api.nomoreparties.co/${image.url}`}
        alt={nameRU}
        className="cards__item-image"
      ></img>
      <div className="cards__item-info">
        <p className="cards__item-title">{nameRU}</p>
        {isSaved && (
          <button
            className={`cards__item-deletebutton ${
              isToRemove && "cards__item-deletebutton_type_active"
            } `}
          />
        )}
        {!isSaved && (
          <button
            className={`cards__item-likebutton ${
              isLiked
                ? "cards__item-likebutton_type_active"
                : "cards__item-likebutton_type_inactive"
            } `}
            onClick={handleLikes}
          />
        )}
      </div>
      <p className="cards__item-duration">{time}</p>
    </li>
  );
};

export default MoviesCard;
