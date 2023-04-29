import SearchForm from "./SearchForm";
import MoviesCardList from './MoviesCardList';

function Movies({ movies }) {
  return(
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}

export default Movies;