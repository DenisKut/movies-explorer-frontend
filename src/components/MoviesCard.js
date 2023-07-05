import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function MoviesCard ({
  movie,
  savedMovies,
  onLikeClick,
  onDeleteClick,
  setSavedMovies
}) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [localSavedList, setLocalSavedList] = useState(() => JSON.parse(localStorage.getItem('savedMovies')));
  const [likedMovie, setLikedMovie] = useState(() => localSavedList.find(savedMovie => savedMovie.nameRU === movie.nameRU || savedMovie.nameEN === movie.nameEN));

  const handleLikeClick = () => {
    onLikeClick(movie);
    setIsLiked(true);
  }

  const handleDeleteClick = () => {
    onDeleteClick(movie);
    setIsLiked(false);
  }

  const changeDuration = (duration) => {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`;
  }

  useEffect(() => {
    if(likedMovie) {
      setIsLiked(true);
    }
  }, [likedMovie, location]);

  return (
    <li className='movies-card'>
      <article className='movies-card__block'>
        <img
          className='movies-card__poster'
          src={location.pathname === '/movies' ?
            `https://api.nomoreparties.co${movie.image.url}` : movie.image }
          alt={movie.nameRU}
        />
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>
            {movie.nameRU}
          </h2>
          {location.pathname === '/movies' && (
            <button
              className={`movies-card__button ${
                isLiked ? 'movies-card__button_type_saved' : ''
              }`}
              type="button"
              onClick={isLiked ? handleDeleteClick : handleLikeClick}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className='movies-card__button movies-card__button_type_unsave'
              type="button"
              onClick={handleDeleteClick}
            ></button>
          )}
        </div>
        <span className='movies-card__duration'>{changeDuration(movie.duration)}</span>
      </article>
    </li>
  )
}

export default MoviesCard;