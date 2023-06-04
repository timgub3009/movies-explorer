import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/savedMovies";

const SavedMovies = () => {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList
        moviesAreLeft={false}
        isSaved={true}
        renderedCards={cards}
      />
    </div>
  );
};

export default SavedMovies;
