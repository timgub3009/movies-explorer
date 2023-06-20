import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = () => {

  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList
        isSaved={true}
      />
    </div>
  );
};

export default SavedMovies;
