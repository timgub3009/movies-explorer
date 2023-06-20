import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ movies, onClick, areMoviesLeft }) => {
  return (
    <section className="cards">
      {movies !== undefined && movies.length === 0 ? (
        <p className="movies__search-error">
          Увы, ни одного фильма не найдено...
        </p>
      ) : (
        <ul className="cards__items">
          {movies?.map((movie) => (
            <MoviesCard key={movie.id} {...movie} />
          ))}
        </ul>
      )}
      <div className="cards__button-container">
        <button
          onClick={onClick}
          className={
            areMoviesLeft
              ? "cards__button-more"
              : "cards__button-more_type_invisible"
          }
        >
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
