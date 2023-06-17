import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import safeStorage from "../../utils/safe-storage";

const Movies = () => {
  const isLoading = false;

  const maybeMoviesJSONString = JSON.parse(safeStorage.getItem("movies"));

  const onSubmitFilter = () => {
    
    moviesApi.getMovies().then((movies) => {
      // https://mdn.io/anything <- quickly search throught mdn for anything
      try {
        const moviesJSONString = JSON.stringify(movies); // <- an excpetion can happen here 
        safeStorage.setItem("movies", moviesJSONString);
      } catch {
        // ignored.
      }
    });
  }


  return (
    <div className="movies">
      <SearchForm onSubmitFilter={onSubmitFilter} movies={maybeMoviesJSONString}/>
      {isLoading && <Preloader />}
      <MoviesCardList movies={maybeMoviesJSONString} moviesAreLeft={true} savedMovies={false} />
    </div>
  );
};

export default Movies;
