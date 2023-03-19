import FilterCheckbox from "./FilterCheckbox";

function SearchForm() {
  return(
    <section className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          required
          placeholder="Фильм"
        />
        <button className="search__btn" type="submit">
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;