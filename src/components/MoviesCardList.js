import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList({
  movies,
  isSearchError,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  setSavedMovies
}) {
  const screenSize = document.documentElement.clientWidth;
  const [viewedCards, setViewedCards] = useState(5);
  const location = useLocation();

  const handleViewCards = () => {
    const editCardsNumber = () => {
      if(screenSize < 600) {
        setViewedCards(5);
      } else if (screenSize < 1024 && screenSize >= 600) {
        setViewedCards(8);
      } else {
        setViewedCards(12);
      }
    };
    setTimeout(editCardsNumber, 1000);
  };

  const handleMoreCardsClick = () => {
    if (screenSize < 600)
      setViewedCards(viewedCards + 2);
    else
      setViewedCards(viewedCards + 3);
  }

  window.addEventListener('resize', handleViewCards, false);

  return(
    <section className='movies-card-list'>
      {isSearchError && (<p className='movies-card-list__search-error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>)}
      {(movies == null || movies.length === 0) && (<p className='movies-card-list__search-not-found'>Ничего не найдено</p>)}
      <ul className='movies-card-list__list'>
        { (movies != null) &&
          movies.slice(0, viewedCards).map(movie => {
            return (
              <MoviesCard
                key={movie.movieId || movie._id || movie.id}
                movie={movie}
                savedMovies={savedMovies}
                onLikeClick={handleSaveMovie}
                onDeleteClick={handleDeleteMovie}
                setSavedMovies ={setSavedMovies}
              />
            )
          })
        }
      </ul>
      {location.pathname === "/movies" &&
        movies != null &&
        movies.length >= 5 &&
        viewedCards < movies.length &&
      (
        <button
          className='movies-card-list__more'
          onClick={handleMoreCardsClick}
        >
          Ещё
        </button>
      )}
    </section>
  )
}

export default MoviesCardList;