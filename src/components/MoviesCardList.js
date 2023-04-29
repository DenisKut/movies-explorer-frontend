import {useLocation} from 'react-router-dom';
import {useEffect, useState, useCallback} from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList({ movies }) {
  const location = useLocation();

  const [screenSize, setScreenSize] = useState(document.documentElement.clientWidth);

  const handleResizeScreen = useCallback(() => {
    setScreenSize(document.documentElement.clientWidth);
  }, [setScreenSize]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeScreen)
  }, [handleResizeScreen])

  return(
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {
          screenSize >= 1280 && movies.slice(0, 12)
            .map(card => <MoviesCard key={card._id} card={card}/>)
        }
        {
          screenSize >= 600 && screenSize < 1280 && movies.slice(0, 8)
            .map(card => <MoviesCard key={card._id} card={card}/>)
        }
        {
          screenSize < 600 && movies.slice(0, 5)
            .map(card => <MoviesCard key={card._id} card={card}/>)
        }
      </ul>
      {location.pathname === "/movies" && (
        <button
          className='movies-card-list__more'
        >
          Ещё
        </button>
      )}
    </section>
  )
}

export default MoviesCardList;