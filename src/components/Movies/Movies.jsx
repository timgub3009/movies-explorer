import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import safeStorage from "../../utils/safe-storage";

const Movies = () => {
  // Array<{ title: ..., nameRU: ..., year: ... }> | undefined
  const [allMovies, setAllMovies] = React.useState();

  // Array<{ title: ..., nameRU: ..., year: ... }> | undefined
  const [filteredMovies, setFilteredMovies] = React.useState();

  React.useEffect(() => {
    const maybeString = safeStorage.getItem("movies");
    if (!maybeString) return;
    try {
      setAllMovies(JSON.parse(maybeString)); // JSON.parse throws a SyntaxError in case `maybeString` is not in JSON format.
    } catch {
      safeStorage.removeItem("movies");
    }
  }, []);

  const handleSearch = React.useCallback(({ searchValue }, searchIfLocalStorageHasMovies) => {
    searchValue = searchValue.toLowerCase();
    const storageHasMovies = allMovies != null;

    // Hey, JavaScript, have movies already been loaded from the server or storage?
    if (!storageHasMovies) {
      if (searchIfLocalStorageHasMovies) {
        return;
      }
      moviesApi
        .getMovies()
        .then((moviesArray) => {
          setAllMovies(moviesArray); // async schedules an update, which will happen in the future, on the next rerender (maybe)
          safeStorage.setItem("movies", JSON.stringify(moviesArray));
          
          setFilteredMovies(filterMovies(moviesArray, searchValue));
        })
        .catch(() => {
          // we can not perform filter, server did not respond or responded witn an error.
          // TODO: add an error message, that server did not respond try agian later or something.
        });
    } else {
      setFilteredMovies(filterMovies(allMovies, searchValue));
    }
  }, [allMovies]);

  const isLoading = false;

  // const onSubmitFilter = () => {
  //   moviesApi.getMovies().then((movies) => {
  //     // https://mdn.io/anything <- quickly search throught mdn for anything
  //     try {
  //       const moviesJSONString = JSON.stringify(movies); // <- an excpetion can happen here
  //       safeStorage.setItem("movies", moviesJSONString);
  //     } catch {
  //       // ignored.
  //     }
  //   });
  // };

  return (
    <div className="movies">
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Preloader />}
      <MoviesCardList
        movies={filteredMovies}
        // moviesAreLeft={true}
        // savedMovies={false}
      />
    </div>
  );
};

const filterMovies = (movies, searchValue) => 
  movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue));

export default Movies;
