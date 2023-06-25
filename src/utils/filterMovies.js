const filterMovies = (movies, searchValue, isShort) =>
  movies.filter(
    (movie) =>
      (isShort ? movie.duration <= 40 : movie) &&
      movie.nameRU.toLowerCase().includes(searchValue)
  );

export default filterMovies;
