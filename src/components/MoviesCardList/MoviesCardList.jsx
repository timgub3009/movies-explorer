import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('https://api.nomoreparties.co/beatfilm-movies')
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
            {items.map((movie) => <MoviesCard key={movie.id} {...movie}/>)}
        </ul>

        <div className="cards__button-container">
            <button className='cards__button-more'>Ещё</button>
        </div>
    </section>
  )
}

export default MoviesCardList