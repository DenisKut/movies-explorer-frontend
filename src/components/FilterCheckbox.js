function FilterCheckbox({checkboxState, handleChangeCheckbox}) {
  return(
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        checked = {checkboxState}
        onChange={handleChangeCheckbox}
      />
      <span className="filter__slider"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;