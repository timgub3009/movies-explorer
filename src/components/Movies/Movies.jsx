import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import safeStorage from "../../utils/safe-storage";
import MoviesCard from "../MoviesCard/MoviesCard";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import filterMovies from "../../utils/filterMovies";
import { FULL_WIDTH, SMALLER_WIDTH, SMARTPHONE_WIDTH, STANDART_WIDTH } from "../../utils/constants";

const Movies = ({
  savedMovies,
  windowWidth,
  onError,
  onMovieAdd,
  onMovieRemove,
}) => {
  useDocumentTitle("Фильмы");

  // ALL MOVIES
  // **************************************************
  const [allMovies, setAllMovies] = React.useState();
  const [areMoviesLoading, setAreMoviesLoading] = React.useState(false);

  // FILTERED MOVIES
  // **************************************************
  const [filteredMovies, setFilteredMovies] = React.useState();

  // CARDS AMOUNT
  // **************************************************
  const [cardsAmount, setCardsAmount] = React.useState(0);

  // Try to load movies from storage
  React.useEffect(() => {
    const maybeString = safeStorage.getItem("movies");
    if (!maybeString) return;
    try {
      setAllMovies(JSON.parse(maybeString));
    } catch {
      safeStorage.removeItem("movies");
    }
  }, []);

  React.useEffect(() => {
    if (windowWidth > FULL_WIDTH) {
      setCardsAmount(12);
    } else if (windowWidth > STANDART_WIDTH) {
      setCardsAmount(9);
    } else if (windowWidth > SMALLER_WIDTH) {
      setCardsAmount(6);
    } else if (windowWidth > SMARTPHONE_WIDTH) {
      setCardsAmount(5);
    }
  }, [windowWidth]);

  const handleMoreMoviesClick = () => {
    if (windowWidth > FULL_WIDTH) {
      setCardsAmount(cardsAmount + 4);
    } else if (windowWidth > STANDART_WIDTH) {
      setCardsAmount(cardsAmount + 3);
    } else if (windowWidth > SMALLER_WIDTH) {
      setCardsAmount(cardsAmount + 2);
    } else if (windowWidth > SMARTPHONE_WIDTH) {
      setCardsAmount(cardsAmount + 2);
    }
  };

  const handleSearch = React.useCallback(
    ({ searchValue, isShort }, searchIfLocalStorageHasMovies) => {
      searchValue = searchValue.toLowerCase();
      const storageHasMovies = allMovies != null;

      // check if movies have already been downloaded
      if (!storageHasMovies) {
        if (searchIfLocalStorageHasMovies) {
          return;
        }

        setAreMoviesLoading(true);

        moviesApi
          .getMovies()
          .then((moviesArray) => {
            setAllMovies(moviesArray);
            safeStorage.setItem("movies", JSON.stringify(moviesArray));
            setFilteredMovies(filterMovies(moviesArray, searchValue, isShort));
          })
          .catch(() => {
            onError(
              "Во время запроса произошла ошибка. " +
                "Возможно, проблема с соединением или сервер недоступен. " +
                "Подождите немного и попробуйте ещё раз. "
            );
          })
          .finally(() => {
            setAreMoviesLoading(false);
          });
      } else {
        setFilteredMovies(filterMovies(allMovies, searchValue, isShort));
      }
    },
    [allMovies, onError]
  );

  return (
    <div className="movies">
      <SearchForm storageKey="Movies.searchValue" onSearch={handleSearch} />

      <section className="cards">
        {areMoviesLoading ? (
          <Preloader />
        ) : filteredMovies && filteredMovies.length === 0 ? (
          <p className="movies__search-error">
            Увы, ни одного фильма не найдено...
          </p>
        ) : (
          <ul className="cards__items">
            {filteredMovies?.slice(0, cardsAmount).map((movie) => {
              const isLiked = savedMovies?.some(
                (savedMovie) => savedMovie.movieId === movie.id
              );

              return (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  isLiked={isLiked}
                  onMovieLikeOrDislike={isLiked ? onMovieRemove : onMovieAdd}
                />
              );
            })}
          </ul>
        )}

        {filteredMovies &&  cardsAmount < filteredMovies.length ? (
          <div className="cards__button-container">
            <button
              onClick={handleMoreMoviesClick}
              className="cards__button-more"  
            >
              Ещё
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Movies;
