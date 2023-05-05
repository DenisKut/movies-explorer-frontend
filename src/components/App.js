import { Helmet } from 'react-helmet';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import mainApi from '../utils/MainApi';
import useEscapePress from '../hooks/useEscapePress';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import Preloader from './Preloader';
import StatusInfoBlock from './StatusInfoBlock';

function App() {
  const history = useHistory();
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completeLoad, setCompleteLoad] = useState(false);
  const [isStatusInfo, setIsStatusInfo] = useState({
    isOpen: false,
    successful: true,
    text: ''
  });

  const headerEndpoints = ['/', '/movies', '/saved-movies', '/profile'];
  const footerEndpoints = ['/', '/movies', '/saved-movies'];

  const onClickBurgerMenu = () => {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  const returnOnPrevPage = () => {
    history.goBack();
  }

  function handleCloseStatusInfo() {
    setIsStatusInfo({...isStatusInfo, isOpen: false});
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then(jwt => {
        if(jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
          setIsStatusInfo({
            isOpen: true,
            successful: true,
            text: "Добро пожаловать!",
          })
        }
      })
      .catch(error => {
        setIsStatusInfo({
          isOpen: true,
          successful:false,
          text: error,
        })
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then(data => {
        if(data) {
          handleLogin({ email, password });
          history.push('/movies');
          setIsStatusInfo({
            isOpen: true,
            successful: true,
            text: "Вы зарегистрированы!",
          })
        }
      })
      .catch(error =>
        setIsStatusInfo({
          isOpen: true,
          successful:false,
          text: error,
        })
      )
      .finally(() => setIsLoading(false));
  }


  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
    setCurrentUser({});
    setLoggedIn(false);
  }

  function handleEditProfile({ name, email }) {
    setIsLoading(true);
    mainApi
      .setUserInfo(name, email)
      .then(newData => {
        setCurrentUser(newData);
        setIsStatusInfo({
          isOpen: true,
          successful:true,
          text: "Данные профиля обновлены!",
        });
      })
      .catch(error => {
        setIsStatusInfo({
          isOpen: true,
          successful:false,
          text: error,
        })
      })
      .finally(() => setIsLoading(false));
  }

  function handleSaveMovie(movie) {
    mainApi
      .addMovieInSaves(movie)
      .then(data => {
        setSavedMovies([data, ...savedMovies])
      })
      .catch(error => {
        setIsStatusInfo({
          isOpen: true,
          successful:false,
          text: error,
        });
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId == movie.id ||
        item.movieId == movie.movieId
    );
    mainApi
      .deleteSavedMovie(savedMovie._id)
      .then(() => {
        const newMovies = savedMovies.filter(item => {
          if (item.movieId == movie.id || item.movieId == movie.movieId)
            return false;
          else
            return true;
        });
        setSavedMovies(newMovies)
      })
      .catch(error => {
        setIsStatusInfo({
          isOpen: true,
          successful:false,
          text: error,
        })
      });
  }

  useEscapePress(onClickBurgerMenu, isBurgerMenuOpened);

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then(data => {
          if (data) {
            setCurrentUser(data);
            setLoggedIn(true);
            history.push(path);
          }
        })
        .catch(error => {
          setIsStatusInfo({
            isOpen: true,
            successful:false,
            text: error,
          })
        })
        .finally(() => {
          setCompleteLoad(true);
          setIsLoading(false);
        })
    } else {
      setCompleteLoad(true);
    }
  }, [history]);

   // отслеживание изменений пользователя
   useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then(res => setCurrentUser(res))
        .catch(error => {
          setIsStatusInfo({
            isOpen: true,
            successful:false,
            text: error,
          })
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  // отслеживание изменений сохранённых фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then(data => {
          const UserMovies = data.filter(movie => movie.owner === currentUser.id);
          setSavedMovies(UserMovies);
        })
        .catch(error => {
          setIsStatusInfo({
            isOpen: true,
            successful:false,
            text: error,
          })
        });
    }
  }, [currentUser, loggedIn]);

  return (
    <div className='page'>
      {!completeLoad ? (
        <Preloader isOpen={isLoading}/>
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Preloader isOpen={isLoading}/>
          <StatusInfoBlock
            onClose={handleCloseStatusInfo}
            status={isStatusInfo}
          />
          <Route exact path = {headerEndpoints}>
            <Header
              onClickBurgerBtn={onClickBurgerMenu}
              isBurgerMenuOpened={isBurgerMenuOpened}
              authorized={loggedIn}
            />
          </Route>

          <Switch>
            <Route exact path="/" >
              <Main />
            </Route >

            <Route exact path="/signup">
              {!loggedIn ? (
                <Register
                  handleRegister={handleRegister}
                />
              ) : (
                <Redirect to='/' />
              )}
            </Route>

            <Route exact path="/signin">
            {!loggedIn ? (
              <Login handleLogin={handleLogin}/>
            ) : (
              <Redirect to='/' />
            )}
            </Route>

            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              setIsLoading={setIsLoading}
              savedMovies={savedMovies}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              setIsStatusInfo={setIsStatusInfo}
              component={Movies}
            />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              onDeleteClick={handleDeleteMovie}
              setIsStatusInfo={setIsStatusInfo}
              component={SavedMovies}
            />

            <ProtectedRoute
              path='/profile'
              loggedIn={loggedIn}
              handleEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
              component={Profile}
            />
            <Route path="*">
              <NotFound goBack={returnOnPrevPage} />
            </Route>
          </Switch>
          <Route exact path={footerEndpoints}>
            <Footer />
          </Route>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
