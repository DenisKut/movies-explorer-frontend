import { useEffect, useContext, useState } from "react";
import {
  filterShortMovies,
  findMoviesByQuery
} from '../utils/utils';
import SearchForm from "./SearchForm";
import MoviesCardList from './MoviesCardList';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SavedMovies({ savedMovies, onDeleteClick, setIsStatusInfo }) {
  const currentUser = useContext(CurrentUserContext);

  const [showedMovies, setShowedMovies] = useState(savedMovies);//отображаемые фильмы
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false); //состояние чекбокса поиска
  const [filteredMovies, setFilteredMovies] = useState([showedMovies]); // отфильтрованные по чекбоксу фильмы
  const [isEmpty, setIsEmpty] = useState(false); //пустой результат поиска

  function handleSubmitSearch(value) {
    const moviesList = findMoviesByQuery(savedMovies, value, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsEmpty(true);
      setIsStatusInfo({
        isOpen: true,
        successful: false,
        text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      })
    } else {
      setIsEmpty(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortMoviesCheckbox() {
    if (!shortMoviesCheckbox) {
      setShortMoviesCheckbox(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    } else {
      setShortMoviesCheckbox(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
      setShowedMovies(filteredMovies);
    }
  }

  // проверка чекбокса в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
      setShortMoviesCheckbox(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setShortMoviesCheckbox(false);
      setShowedMovies(savedMovies);
    }
  }, [savedMovies, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setIsEmpty(false) : setIsEmpty(true);
  }, [savedMovies]);

  return(
    <main className="movies">
      <SearchForm
        shortMoviesCheckbox={shortMoviesCheckbox}
        handleShortMoviesCheckbox={handleShortMoviesCheckbox}
        handleSubmitSearch={handleSubmitSearch}
      />
      {!isEmpty && (
        <MoviesCardList
          movies = {showedMovies}
          savedMovies = {savedMovies}
          onDeleteClick = {onDeleteClick}
        />
      )}
    </main>
  )
}

export default SavedMovies;