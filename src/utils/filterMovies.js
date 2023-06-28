import { SHORT_MOVIE } from "./constants";

const filterMovies = (movies, searchValue, isShort) =>
  movies.filter(
    (movie) =>
      (isShort ? movie.duration <= SHORT_MOVIE : movie) &&
      movie.nameRU.toLowerCase().includes(searchValue)
  );

export default filterMovies;
