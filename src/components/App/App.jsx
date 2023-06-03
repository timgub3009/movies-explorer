import { Route, Routes } from "react-router-dom";
import React from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";
import Register from "../Register/Register";
import Login from '../Login/Login';
import Movies from '../Movies/Movies';

const App = () => {

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={false}/>
              <Main />
              <Footer />
            </>
          }
        ></Route>
        <Route path="/movies"  element={
            <>
            <Header loggedIn={true}/>
            <Movies />
            <Footer />
            </>
          }>
        </Route>
        <Route path="/saved-movies"></Route>
        <Route path="/profile"></Route>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
    </div>
  );
};

export default App;
