import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';
import Preloader from './Preloader';
import mainApi from '../utils/MainApi';
import moviesApi from '../utils/MoviesApi';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isHeadThemeLight, setIsHeaderThemeLight] = useState(false);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateState, setUpdateState] = useState(true);
  const [updateResMessage, setUpdateResMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loginError, setloginError] = useState('');
  const [isSearchError, setIsSearchError] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);



  const onClickBurgerMenu = (isBurgerMenuOpened) => {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  const returnOnPrevPage = () => {
    history.goBack();
  }

  const handleChangeCheckbox = (event) => {
    setCheckboxState(event.target.checked);
  }

  const filterMoviesByQuery = (query, movies) => {
    const moviesByQuery = movies.filter(movie => {
      return movie.nameRU.includes(query) || movie.nameEN.includes(query)
    });

    if(checkboxState) {
      return moviesByQuery.filter(movie => movie.duration < 40);
    } else {
      return moviesByQuery;
    }
  }

  const handleSearchInitialSubmit = (query) => {
    setIsLoading(true);
    setIsSearchError(false);
    setMovies([]);
    if(initialMovies.length === 0) {
      moviesApi
        .getMovies()
        .then(moviesData => {
          setInitialMovies(moviesData);
          let result = filterMoviesByQuery(query, moviesData);
          console.log(result);
          if(result.length === 0) {
            setMovies([]);
          } else {
            setMovies(result);
            console.log(movies);
            localStorage.setItem('initialMoviesSearch', JSON.stringify(result));
          }
        })
        .catch(() => {
          setMovies([]);
          setIsSearchError(true);
        })
        .finally(() => setIsLoading(false))
    } else {
      const result = filterMoviesByQuery(query, initialMovies);
      if(result.length === 0) {
        console.log(initialMovies)
        setMovies([]);
      } else if (result.length !== 0) {
        setMovies(result);
        localStorage.setItem('initialMoviesSearch', JSON.stringify(result));
      } else {
        setMovies([]);
        setIsSearchError(true);
      }
      setIsLoading(false);
    }
  }

  const handleSearchInSavedSubmit = (query) => {
    const result = filterMoviesByQuery(query, JSON.parse(localStorage.getItem('savedMovies')));
    setSavedMovies(result);
  }

  const handleSaveMovie = (movie) => {
    mainApi
      .addMovieInSaves(movie)
      .then(data => {
        setSavedMovies((prevState) => ([...prevState, data]));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleDeleteMovie = (movie) => {
    const savedCard = savedMovies.find(
      (item) => item.movieId == movie.id ||
        item.movieId == movie.movieId
    );
    mainApi
      .deleteSavedMovie(savedCard)
      .then((res) => {
        const newMovies = savedMovies.filter(item => {
          if (item.movieId === res.id || item.movieId === movie.movieId)
            return false;
          else
            return true;
        });
        setSavedMovies(newMovies);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch(error => console.log(error));
  }

  const handleEditProfile = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .setUserInfo(name, email)
      .then(newData => {
        setUpdateState(true);
        setUpdateResMessage('Данные профиля обновлены!');
        setCurrentUser(newData);
      })
      .catch(error => {
        setUpdateState(false);
        setUpdateResMessage(error);
      })
      .finally(() => setIsLoading(false));
  }

  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then(data => {
        if(data) {
          handleLogin({email, password});
          setRegisterError('');
        }
      })
      .catch(error => {
        setRegisterError(error);
      })
      .finally(() => setIsLoading(false));
  }

  const handleLogin = ({email, password}) => {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then(jwt => {
        if(jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(error => {
        setloginError(error);
      })
      .finally(() => setIsLoading(false));
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMoviesSearch');
    setLoggedIn(false);
    setInitialMovies([]);
    setMovies([]);
    history.push('/');
    setCurrentUser({});
  }

  useEffect(() => {
    if(location.pathname === '/') {
      setIsHeaderThemeLight(false);
    } else {
      setIsHeaderThemeLight(true);
    }
  }, [location, history]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const searchedMovies = JSON.parse(localStorage.getItem('initialMoviesSearch'));

    if(token) {
        mainApi
          .getInitialData()
          .then(([user, movies]) => {
              setCurrentUser(user);
              setLoggedIn(true);
              const UserMovies = movies.filter(movie => movie.owner === currentUser.id);
              localStorage.setItem('savedMovies', JSON.stringify(UserMovies));
              setSavedMovies(UserMovies);
              console.log(savedMovies);
              setMovies(searchedMovies);
          })
          .catch(error => {
              console.log(error);
              }
          )
    }
  }, [history, loggedIn])

useEffect(() => {
    setUpdateResMessage('');

    mainApi.getSavedMovies()
        .then((res) => {
            setSavedMovies(res);
            //console.log(savedMovies);
        })
}, [location]);

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Preloader isOpen={isLoading} />
        {(location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') && (
          <Header
            themeLight={isHeadThemeLight}
            onClickBurgerBtn={onClickBurgerMenu}
            isBurgerMenuOpened={isBurgerMenuOpened}
            authorized={loggedIn}
          />
        )}
        <Switch>
          <Route exact path="/" >
            <Main />
          </Route >

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            handleSearchInitialSubmit = {handleSearchInitialSubmit}
            checkboxState = {checkboxState}
            handleChangeCheckbox = {handleChangeCheckbox}
            movies = {movies}
            savedMovies = {savedMovies}
            handleSaveMovie = {handleSaveMovie}
            handleDeleteMovie = {handleDeleteMovie}
            isSearchError = {isSearchError}
            setSavedMovies ={setSavedMovies}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            handleSearchInSavedSubmit = {handleSearchInSavedSubmit}
            checkboxState = {checkboxState}
            handleChangeCheckbox = {handleChangeCheckbox}
            movies = {savedMovies}
            handleDeleteMovie = {handleDeleteMovie}
          />

            <Route exact path="/signup">
              {!loggedIn ? (
                <Register
                  handleRegister={handleRegister}
                  registerError={registerError}
                />
              ) : (
                <Redirect to='/' />
              )}
            </Route>

            <Route exact path="/signin">
            {!loggedIn ? (
              <Login
                handleLogin={handleLogin}
                loginError={loginError}
              />
            ) : (
              <Redirect to='/' />
            )}
            </Route>

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            handleEditProfile={handleEditProfile}
            handleSignOut={handleSignOut}
            updateState={updateState}
            updateResMessage={updateResMessage}
          />

          <Route path="*">
            <NotFound goBack={returnOnPrevPage} />
          </Route>
        </Switch>
        {(location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies') && (
          <Footer />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
