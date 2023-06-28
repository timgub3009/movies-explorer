import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import NotFound from "../PageNotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import tokenStorage from "../../utils/token-storage";
import Preloader from "../Preloader/Preloader";
import Infotooltip from "../Infotooltip/Infotooltip";

const App = () => {
  // CURRENT USER
  // **************************************************
  const [currentUser, setCurrentUser] = React.useState(); // User | null | undefined
  const isCurrentUserLoading = typeof currentUser == "undefined";

  // SAVED MOVIES
  // **************************************************
  const [savedMovies, setSavedMovies] = React.useState(); // Array<Movie> | undefined
  const [areSavedMoviesLoading, setAreSavedMoviesLoading] =
    React.useState(false);

  // ERROR POPUP
  // **************************************************
  const [popupMessage, setPopupMessage] = React.useState(null); // string | null
  const isPopupOpened =
    typeof popupMessage == "string" && popupMessage.length > 0

  const openPopup = React.useCallback((popupMessage) => {
    setPopupMessage(popupMessage);
  }, []);
  const closePopup = React.useCallback(() => {
    setPopupMessage(null);
  }, []);

  // WINDOW WIDTH
  // **************************************************
  const windowWidth = useWindowWidth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = React.useState(false);

  // Try to load current user from the server.
  React.useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setCurrentUser(null);
      return;
    }
    mainApi
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch(() => setCurrentUser(null));
  }, []);

  // Try to load saved movies from the server.
  React.useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;
    setAreSavedMoviesLoading(true);
    mainApi
      .getMovies()
      .then((movies) => setSavedMovies(movies))
      .catch((err) => setPopupMessage(err.message))
      .finally(() => setAreSavedMoviesLoading(false));
  }, []);

  const handleLogin = (email, password) => {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((data) => {
        tokenStorage.set(data.jwt);
        return mainApi.getUserInfo();
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setPopupMessage('Вы авторизовались!');
        navigate("/movies", { replace: true });
      })
      .catch(() => {
        setPopupMessage("Введен неправильный e-mail или пароль");
      }).finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    tokenStorage.remove();
    setCurrentUser(null);
    navigate("/");
  };

  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then(() => handleLogin(email, password))
      .catch(() => {
        setPopupMessage(
          "Зарегистрироваться не удалось. Пользователь с таким e-mail уже существует"
        );
      }).finally(() => setIsLoading(false));
  };

  const handleUserUpdate = (name, email) => {
    setIsLoading(true);
    mainApi
      .updateUser(name, email)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          email: userData.email,
        });
      })
      .then(() => setPopupMessage('Данные отредактированы'))
      .catch(() => {
        setPopupMessage("Отредактировать профиль не удалось");
      }).finally(() => setIsLoading(false));
  };

  const handleMovieAdd = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
      })
      .catch((err) => {
        setSavedMovies(savedMovies);
        setPopupMessage(`Что-то сломалось. ${err.message}`);
      });
  };

  const handleMovieRemove = (movie) => {
    const movieId = movie.id ?? movie.movieId;
    setSavedMovies(
      savedMovies.filter((savedMovie) => savedMovie.movieId !== movieId)
    );

    return mainApi.deleteMovie(movieId).catch((err) => {
      setSavedMovies(savedMovies);
      setPopupMessage(`Что-то сломалось. ${err.message}`);
    });
  };

  if (isCurrentUserLoading || areSavedMoviesLoading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {["/", "/movies", "/saved-movies", "/profile"].includes(
          location.pathname
        ) ? (
          <Header windowWidth={windowWidth} />
        ) : null}

        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                savedMovies={savedMovies}
                windowWidth={windowWidth}
                onError={openPopup}
                onMovieAdd={handleMovieAdd}
                onMovieRemove={handleMovieRemove}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                savedMovies={savedMovies}
                onMovieRemove={handleMovieRemove}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                onUpdateUser={handleUserUpdate}
                onLogout={handleLogout}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/signin" element={<Login onLogin={handleLogin} currentUser={currentUser} isLoading={isLoading}/>} />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} currentUser={currentUser} isLoading={isLoading}/>}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {["/", "/movies", "/saved-movies"].includes(location.pathname) ? (
          <Footer />
        ) : null}

        <Infotooltip
          status={isPopupOpened}
          popupMessage={popupMessage}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const setWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  return windowWidth;
}
