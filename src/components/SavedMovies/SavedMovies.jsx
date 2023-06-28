import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import filterMovies from "../../utils/filterMovies";

const SavedMovies = ({ savedMovies, onMovieRemove }) => {
  useDocumentTitle("Сохранённые фильмы");
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies);

  const handleSearch = React.useCallback(
    ({ searchValue, isShort }) => {
      searchValue = searchValue.toLowerCase();
      setFilteredMovies(filterMovies(savedMovies, searchValue, isShort));
    },
    [savedMovies]
  );

  const handleMovieRemove = (movie) => {
    onMovieRemove(movie).then(() => {
      setFilteredMovies(
        filteredMovies.filter(
          (savedMovie) => savedMovie.movieId !== movie.movieId
        )
      );
    });
  };

  return (
    <div className="saved-movies">
      <SearchForm
        shouldValidate={false}
        onSearch={handleSearch}
      />

      <section className="cards">
        {savedMovies.length === 0 ? (
          <p className="movies__search-error">
            Вы пока еще не сохранили ни одного фильма :(
          </p>
        ) : filteredMovies.length === 0 ? (
          <p className="movies__search-error">
            Увы, ни одного фильма не найдено...
          </p>
        ) : (
          <ul className="cards__items">
            {filteredMovies.map((savedMovie) => {
              return (
                <MoviesCard
                  key={savedMovie.movieId}
                  movie={savedMovie}
                  isSaved
                  onMovieRemove={handleMovieRemove}
                />
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SavedMovies;
