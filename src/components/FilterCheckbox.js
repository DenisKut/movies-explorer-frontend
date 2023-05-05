function FilterCheckbox({ shortMoviesCheckbox, handleShortMoviesCheckbox }) {
  return(
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShortMoviesCheckbox}
        checked={shortMoviesCheckbox ? true : false}
      />
      <span className="filter__slider"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;