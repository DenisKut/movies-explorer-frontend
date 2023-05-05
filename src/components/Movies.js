import { useEffect, useContext, useState } from "react";
import moviesApi from '../utils/MoviesApi';
import {
  filterShortMovies,
  findMoviesByQuery,
  transformMovies
} from '../utils/utils';
import SearchForm from "./SearchForm";
import MoviesCardList from './MoviesCardList';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Movies({ savedMovies, onLikeClick, onDeleteClick, setIsLoading, setIsStatusInfo }) {
  const currentUser = useContext(CurrentUserContext);

  const [allData, setAllData] = useState([])// Все фильмы разом
  const [moviesFromQuery, setMoviesFromQuery] = useState([]); // фильмы с запроса
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false); //состояние чекбокса поиска
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу фильмы
  const [isEmpty, setIsEmpty] = useState(false); //пустой результат поиска

  function handleEditFilteredMovies(movies, query, shortMoviesCheckbox) {
    const moviesList = findMoviesByQuery(movies, query, shortMoviesCheckbox);
    if(moviesList.length === 0) {
      setIsStatusInfo({
        isOpen:true,
        successful: false,
        text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
      })
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
    setMoviesFromQuery(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  function handleSubmitSearch(value) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, value);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMoviesCheckbox);

    if(allData.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then(movies => {
          setAllData(movies);
          handleEditFilteredMovies(
            transformMovies(movies),
            value,
            shortMoviesCheckbox
          );
        })
        .catch(() => {
          setIsStatusInfo({
            isOpen:true,
            successful: false,
            text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
          })
        })
        .finally(() => setIsLoading(false));
    } else {
      handleEditFilteredMovies(allData, value, shortMoviesCheckbox);
    }
  }

  function handleShortMoviesCheckbox() {
    setShortMoviesCheckbox(!shortMoviesCheckbox);
    if (!shortMoviesCheckbox)
      setFilteredMovies(filterShortMovies(moviesFromQuery));
    else
      setFilteredMovies(moviesFromQuery)
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMoviesCheckbox);
  }

  // проверка чекбокса в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMoviesCheckbox(true);
    } else {
      setShortMoviesCheckbox(false);
    }
  }, [currentUser]);

  // рендер фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setMoviesFromQuery(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return(
    <main className="movies">{
      //console.log(savedMovies)
    }
      <SearchForm
        shortMoviesCheckbox={shortMoviesCheckbox}
        handleShortMoviesCheckbox={handleShortMoviesCheckbox}
        handleSubmitSearch={handleSubmitSearch}
      />
      {!isEmpty && (
        <MoviesCardList
          movies = {filteredMovies}
          savedMovies = {savedMovies}
          onLikeClick = {onLikeClick}
          onDeleteClick = {onDeleteClick}
        />
      )}
    </main>
  )
}

export default Movies;