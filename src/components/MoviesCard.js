import { useLocation } from 'react-router-dom';
import { changeDuration } from '../utils/utils';

function MoviesCard ({ movie, saved, onLikeClick, onDeleteClick }) {
  const location = useLocation();

  function handleLikeClick() {
    onLikeClick(movie);
  }

  function handleDeleteClick() {
    onDeleteClick(movie);
  }

  return(
    <li className='movies-card'>
      <article className='movies-card__block'>
        <img
          className='movies-card__poster'
          src={movie.image}
          alt={movie.nameRU}
        />
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>
            {`${movie.nameRU}`}
          </h2>
          {location.pathname === '/movies' && (
            <button
              className={`movies-card__button ${
                saved ? 'movies-card__button_type_saved' : ''
              }`}
              type="button"
              onClick={saved ? handleDeleteClick : handleLikeClick}
              aria-label={`${
                saved ? 'Убрать из сохранённых' : 'Сохранить фильм'
              }`}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className='movies-card__button movies-card__button_type_unsave'
              type="button"
              onClick={handleDeleteClick}
              aria-label='Убрать из сохранённых'
            ></button>
          )}
        </div>
        <span className='movies-card__duration'>{changeDuration(movie.duration)}</span>
      </article>
    </li>
  )
}

export default MoviesCard;