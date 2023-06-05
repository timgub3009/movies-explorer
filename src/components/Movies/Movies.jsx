import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Preloader from '../Preloader/Preloader';

const Movies = () => {

  const isLoading = false;

  return (
    <div className="movies">
      <SearchForm />
     {isLoading && <Preloader />}
      <MoviesCardList moviesAreLeft={true} savedMovies={false}/>
    </div>
  );
};

export default Movies;
