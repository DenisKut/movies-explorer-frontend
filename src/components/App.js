import moviesData from '../utils/movies';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Movies from './Movies';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';

function App() {
  const history = useHistory();
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    setSavedMovies(moviesData.filter((movie) => {
      return movie.saved;
    }))
  }, [])

  const onClickBurgerMenu = (isBurgerMenuOpened) => {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  const returnOnPrevPage = () => {
    history.goBack();
  }

  return (
    <div className='page'>
      <Switch>

        <Route exact path="/" >
          <Header
            themeLight={false}
            onClickBurgerBtn={onClickBurgerMenu}
            isBurgerMenuOpened={isBurgerMenuOpened}
            authorized={false}
          />
          <Main />
          <Footer />
        </Route >

        <Route path="/movies">
          <Header
            themeLight={true}
            onClickBurgerBtn={onClickBurgerMenu}
            isBurgerMenuOpened={isBurgerMenuOpened}
            authorized={true}
          />
          <Movies movies={movies}/>
          <Footer />
        </Route>

        <Route exact path="/saved-movies">
          <Header
            themeLight={true}
            onClickBurgerBtn={onClickBurgerMenu}
            isBurgerMenuOpened={isBurgerMenuOpened}
            authorized={true}
          />
          <Movies movies={savedMovies}/>
          <Footer />
        </Route>

        <Route exact path="/signup">
          <Register />
        </Route>

        <Route exact path="/signin">
          <Login />
        </Route>

        <Route exact path="/profile">
          <Header
            themeLight={true}
            onClickBurgerBtn={onClickBurgerMenu}
            isBurgerMenuOpened={isBurgerMenuOpened}
            authorized={true}
          />
          <Profile />
        </Route>

        <Route path="*">
          <NotFound goBack={returnOnPrevPage} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
