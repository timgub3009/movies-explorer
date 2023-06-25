import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

const MoviesCard = ({
  movie, // what movie?
  isSaved, // is it saved ?
  isLiked, // is it liked? undefined on favorite movies (can be undefined)
  onMovieLikeOrDislike, // add movie to saved (can be undefined)
  onMovieRemove, // remove from saved
}) => {
  const [isMouseOverRemove, setIsMouseOverRemove] = React.useState(false);
  const location = useLocation();

  const handleMouseOver = () => {
    setIsMouseOverRemove(true);
  };

  const handleMouseOut = () => {
    setIsMouseOverRemove(false);
  };

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  const time = getTimeFromMins(movie.duration);

  return (
    <li
      className="cards__item"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <a
        className="cards__trailer-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
          className="cards__item-image"
        ></img>
      </a>
      <div className="cards__item-info">
        <p className="cards__item-title">{movie.nameRU}</p>
        {isSaved ? (
          <button
            className={`cards__item-deletebutton ${
              isMouseOverRemove && "cards__item-deletebutton_type_active"
            } `}
            onClick={() => onMovieRemove(movie)}
          />
        ) : (
          <button
            className={`cards__item-likebutton ${
              isLiked
                ? "cards__item-likebutton_type_active"
                : "cards__item-likebutton_type_inactive"
            } `}
            onClick={() => onMovieLikeOrDislike(movie)}
          />
        )}
      </div>
      <p className="cards__item-duration">{time}</p>
    </li>
  );
};

export default MoviesCard;
