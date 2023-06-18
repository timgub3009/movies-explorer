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

const App = () => {
  const [currentUser, setCurrentUser] = React.useState();
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  let location = useLocation();

  const loggedIn = currentUser != null;

  React.useEffect(() => {
    const handleTokenChecking = () => {
      const token = tokenStorage.get();
  
      if (!token) {
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }
  
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(() => {
          setCurrentUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    handleTokenChecking();
  }, []);

  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then((data) => {
        tokenStorage.set(data.jwt);
        return mainApi.getUserInfo();
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    tokenStorage.remove();
    setCurrentUser(null);
    navigate("/");
  };

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = (name, email) => {
    mainApi
      .updateUser(name, email)
      .then((userData) => {
        setCurrentUser({name: userData.name,
      email: userData.email});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ? (
          <Header loggedIn={loggedIn} />
        ) : (
          ""
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          {/* <Route
            path="/movies"
            element={<ProtectedRoute component={Movies} />}
          /> */}
          <Route path="/saved-movies" element={<SavedMovies />} />
          {/* <Route
            element={<ProtectedRoute component={SavedMovies} />}
          /> */}
          <Route
            path="/profile"
            element={<Profile updateUser={updateUser} logout={handleLogout} />}
          />
          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute component={Profile} updateUser={updateUser} />
            }
          /> */}

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
