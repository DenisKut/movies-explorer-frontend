import SearchForm from "./SearchForm";
import MoviesCardList from './MoviesCardList';

function SavedMovies({
  isSavedMoviesSearch = true,
  handleSearchInSavedSubmit,
  checkboxState,
  handleChangeCheckbox,
  movies,
  handleDeleteMovie,
}) {
  return (
    <main className="movies">
       <SearchForm
        isSavedMoviesSearch = {isSavedMoviesSearch}
        handleSearchInSavedSubmit = {handleSearchInSavedSubmit}
        checkboxState = {checkboxState}
        handleChangeCheckbox = {handleChangeCheckbox}
      />
      <MoviesCardList
        movies={movies}
        handleDeleteMovie = {handleDeleteMovie}
      />
    </main>
  )
}

export default SavedMovies;