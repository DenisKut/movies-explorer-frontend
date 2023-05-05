import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { DEVICE_PARAMS } from '../utils/constants';
import { getSavedCard } from '../utils/utils';
import useScreenWidth from '../hooks/useScreenWidth';
import MoviesCard from './MoviesCard';

function MoviesCardList({ movies, savedMovies, onLikeClick, onDeleteClick }) {
  const { desktop, tablet, mobile } = DEVICE_PARAMS;

  const location = useLocation();
  const screenSize = useScreenWidth();
  const [showedMovies, setShowedMovies] = useState([]);
  const [showMore, setShowMore] = useState({ more: 3, total:12 });
  const [mounted, setMounted] = useState(true);

  function handleClickShowMore() {
    const first = showedMovies.length;
    const last = first + showMore.more;
    const difference = movies.length - first;

    if(difference > 0) {
      const newMovies = movies.slice(first, last);
      setShowedMovies([...showedMovies, ...newMovies]);
    }
  }

  // изменение экрана => изменение количества карточек
  useEffect(() => {
    if (location.pathname === '/movies') {
      if (screenSize > desktop.width) {
        setShowMore(desktop.cards);
      } else if (screenSize <= desktop.width && screenSize > mobile.width) {
        setShowMore(tablet.cards);
      } else {
        setShowMore(mobile.cards);
      }
      return () => setMounted(false);
    }
  }, [screenSize, mounted, desktop, tablet, mobile, location.pathname]);

  // изменение отображения фильмов на экране
  useEffect(() => {
    if (movies.length) {
      const res = movies.filter((item, index) => index < showMore.total);
      setShowedMovies(res);
    }
  }, [movies, showMore.total]);

  return(
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {showedMovies.map(movie => {
          return (
          <MoviesCard
            key={movie.movieId || movie._id || movie.id}
            movie={movie}
            saved={getSavedCard(movie, savedMovies)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />
        )})}
      </ul>
      {location.pathname === "/movies" &&
        showedMovies.length >= 5 &&
        showedMovies.length < movies.length &&
      (
        <button
          className='movies-card-list__more'
          onClick={handleClickShowMore}
        >
          Ещё
        </button>
      )}
    </section>
  )
}

export default MoviesCardList;