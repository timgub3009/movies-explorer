import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ moviesAreLeft, isSaved, renderedCards }) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.nomoreparties.co/beatfilm-movies")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <section className="cards">
      <ul className="cards__items">
        {isSaved &&
          renderedCards.map((card) => (
            <MoviesCard isSaved={true} key={card.id} {...card} />
          ))}
        {!isSaved &&
          items.map((movie) => <MoviesCard key={movie.id} {...movie} />)}
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
