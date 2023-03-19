import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard ({ card }) {
  const location = useLocation();
  const [isCardSaved, setIsCardSaved] = useState(card.saved);
  const handleOnCardClick = () => {
    setIsCardSaved(!isCardSaved);
  };

  return(
    <li className='movies-card'>
      <article className='movies-card__block'>
        <img
          className='movies-card__poster'
          src={card.poster}
          alt={card.title}
        />
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>
            {card.title}
          </h2>
          {location.pathname === '/movies' && (
            <button
              className={`movies-card__button ${
                isCardSaved ? 'movies-card__button_type_saved' : ''
              }`}
              type="button"
              onClick={handleOnCardClick}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className='movies-card__button movies-card__button_type_unsave'
              type="button"
            ></button>
          )}
        </div>
        <span className='movies-card__duration'>{card.duration}</span>
      </article>
    </li>
  )
}

export default MoviesCard;