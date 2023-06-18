import SearchForm from "./SearchForm";
import MoviesCardList from './MoviesCardList';

function Movies({
  isSavedMoviesSearch = false,
  handleSearchInitialSubmit,
  checkboxState,
  handleChangeCheckbox,
  movies,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  isSearchError,
  setSavedMovies
}) {
  return(
    <main className="movies">
      <SearchForm
        isSavedMoviesSearch = {isSavedMoviesSearch}
        handleSearchInitialSubmit = {handleSearchInitialSubmit}
        checkboxState = {checkboxState}
        handleChangeCheckbox = {handleChangeCheckbox}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie = {handleDeleteMovie}
        isSearchError = {isSearchError}
        setSavedMovies ={setSavedMovies}
      />
    </main>
  )
}

export default Movies;