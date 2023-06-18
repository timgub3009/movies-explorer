import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import safeStorage from "../../utils/safe-storage";
import { filteredMovies } from "../SearchForm/SearchForm";

const MoviesCardList = ({
  /* moviesAreLeft, isSaved, renderedCards, */ movies,
}) => {
  const [items, setItems] = React.useState([]);
  const moviesAreLeft = true;

  // React.useEffect(() => {
  //   fetch("https://api.nomoreparties.co/beatfilm-movies")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((arr) => {
  //       setItems(arr);
  //     });
  // }, []);

  return (
    <section className="cards">
      <ul className="cards__items">
        {movies?.map((movie) => (
          <MoviesCard key={movie.id} {...movie} />
        ))}
        {/* {isSaved &&
          renderedCards.map((card) => (
            <MoviesCard isSaved={true} key={card.id} {...card} />
          ))} */}
        {/* {!isSaved && */}
        {/* movies.map((movie) => <MoviesCard key={movie.id} {...movie} />)} */}
      </ul>
      <div className="cards__button-container">
        <button
          className={
            moviesAreLeft
              ? "cards__button-more"
              : "cards__button-more_type_invisible"
          }
        >
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
