import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import FilterCheckbox from "./FilterCheckbox";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SearchForm({shortMoviesCheckbox, handleShortMoviesCheckbox, handleSubmitSearch}) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const {
    values,
    handleChangeValues,
    isValid,
    setIsValid
  } = useFormValidation();
  const [errorSpan, setErrorSpan] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    isValid ? handleSubmitSearch(values.search) : setErrorSpan('Нужно ввести ключевое слово');
  };

  useEffect(() => {
    setErrorSpan('');
  }, [isValid]);

  //состояние поисковика из локального хранилища
  useEffect(() => {
    if (location.pathname === '/movies' &&
    localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return(
    <section className="search">
      <form
        className="search__form"
        name="search"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="search__input"
          name="search"
          type="text"
          required
          placeholder="Фильм"
          autoComplete="off"
          value={values.search || ''}
          onChange={handleChangeValues}
        />
        <span className="search__error">{errorSpan}</span>
        <button className="search__btn" type="submit">
          Найти
        </button>
      </form>
      <FilterCheckbox
        shortMoviesCheckbox={shortMoviesCheckbox}
        handleShortMoviesCheckbox={handleShortMoviesCheckbox}
      />
    </section>
  )
}

export default SearchForm;