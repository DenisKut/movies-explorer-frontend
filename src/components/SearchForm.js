
import FilterCheckbox from "./FilterCheckbox";
import React, { useState } from "react";

function SearchForm({
  isSavedMoviesSearch,
  handleSearchInSavedSubmit,
  handleSearchInitialSubmit,
  checkboxState,
  handleChangeCheckbox
}) {
  const [searchInput, setSearchInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isSavedMoviesSearch) {
      handleSearchInSavedSubmit(searchInput);
    } else {
      handleSearchInitialSubmit(searchInput);
    }
  }

  const handleChangeInputValues = (event) => {
    if(event.target.value === '' || event.target.checkValidity() === false){
      setIsInputError(false);
    }
    setSearchInput(event.target.value);
  }

  return(
    <section className="search">
      <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search__input"
          name="search"
          type="text"
          required
          placeholder="Фильм"
          autoComplete="off"
          onChange={handleChangeInputValues}
          value={searchInput || ''}
        />{
          isInputError &&
          (<span className="search__error">Нужно ввести ключевое слово</span>)
        }
        <button className="search__btn" type="submit">
          Найти
        </button>
      </form>
      <FilterCheckbox
        checkboxState = {checkboxState}
        handleChangeCheckbox = {handleChangeCheckbox}
      />
    </section>
  )
}

export default SearchForm;