import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import safeStorage from "../../utils/safe-storage";

const Movies = ({ windowWidth }) => {
  const [allMovies, setAllMovies] = React.useState();
  const [filteredMovies, setFilteredMovies] = React.useState();
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    const maybeString = safeStorage.getItem("movies");
    if (!maybeString) return;
    try {
      setAllMovies(JSON.parse(maybeString)); // JSON.parse throws a SyntaxError in case `maybeString` is not in JSON format
    } catch {
      safeStorage.removeItem("movies");
    }
  }, []);

  React.useEffect(() => {
    if (windowWidth > 1279) {
      setCardsAmount(12);
    } else if (windowWidth > 1000) {
      setCardsAmount(9);
    } else if (windowWidth > 720) {
      setCardsAmount(6);
    } else if (windowWidth > 550) {
      setCardsAmount(5);
    }
  }, [windowWidth]);

  const handleSearch = React.useCallback(
    ({ searchValue, isShort }, searchIfLocalStorageHasMovies) => {
      searchValue = searchValue.toLowerCase();
      const storageHasMovies = allMovies != null;

      // check if movies have already been downloaded
      if (!storageHasMovies) {
        if (searchIfLocalStorageHasMovies) {
          return;
        }
        setIsLoading(true);
        moviesApi
          .getMovies()
          .then((moviesArray) => {
            setAllMovies(moviesArray); // async schedules an update, which will happen in the future, on the next rerender (maybe)
            safeStorage.setItem("movies", JSON.stringify(moviesArray));
            setFilteredMovies(filterMovies(moviesArray, searchValue, isShort));
          })
          .catch(() => {
            setErrorMessage(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            ); // we can not perform filter, server did not respond or responded witn an error.
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setFilteredMovies(filterMovies(allMovies, searchValue, isShort));
      }
    },
    [allMovies]
  );

  const handleMoreMoviesBtn = () => {
    if (windowWidth > 1279) {
      setCardsAmount(cardsAmount + 4);
    } else if (windowWidth > 1000) {
      setCardsAmount(cardsAmount + 3);
    } else if (windowWidth > 720) {
      setCardsAmount(cardsAmount + 2);
    } else if (windowWidth > 550) {
      setCardsAmount(cardsAmount + 2);
    }
  };

  return (
    <div className="movies">
      <SearchForm onSearch={handleSearch} />
      {isLoading ? (
        <Preloader />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <MoviesCardList
          movies={filteredMovies?.slice(0, cardsAmount)}
          areMoviesLeft={
            filteredMovies ? cardsAmount < filteredMovies.length : undefined
          }
          onClick={handleMoreMoviesBtn}
        />
      )}
    </div>
  );
};

const filterMovies = (movies, searchValue, isShort) =>
  movies.filter(
    (movie) =>
      (isShort ? movie.duration <= 40 : movie) &&
      movie.nameRU.toLowerCase().includes(searchValue)
  );

export default Movies;
