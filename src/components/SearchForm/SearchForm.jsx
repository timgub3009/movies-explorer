import React from "react";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import button from "../../images/search_btn.svg";
import icon from "../../images/search-icon.svg";
import "./SearchForm.css";
import useFormValidation from "../../hooks/useFormValidation";
import moviesApi from "../../utils/MoviesApi";
import safeStorage from "../../utils/safe-storage";


const SearchForm = ({onSubmitFilter, movies}) => {
  // const [searchValue, setSearchValue] = React.useState(function getInitialSearchValue() {
  //   if (typeof window == 'undefined') return "";
  //   return window.localStorage.getItem("searchValue") ?? "";
  // });

  const [searchValue, setSearchValue] = React.useState("");
  const [searchError, setSearchError] = React.useState(null);
  const searchInputRef = React.useRef(null);

  const SEARCH_VALUE_STORAGE_KEY = "searchValue";

  React.useEffect(() => {
    const maybeInitialSearchValue = safeStorage.getItem(SEARCH_VALUE_STORAGE_KEY);
    if (maybeInitialSearchValue) {
      setSearchValue(maybeInitialSearchValue);
    }
  }, []);

  const handleSearchValueChange = (event) => {
    const value = event.target.value;
    safeStorage.setItem(SEARCH_VALUE_STORAGE_KEY, value);
    setSearchValue(value);
  };

  // let value = "the fast and the furious 2";
  // let input = <div><input value={"hello"} /></div>
  // let input = React.createElement("div", null, React.createElement("input", { value: "hello" }));
  // { type: 'div', props: { children: { type: 'input', props: { value: 'Hello', children: { type: 'span} } } }}



  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValueCleaned = searchValue.trim();

    if (searchValueCleaned.length == 0) {
      searchInputRef.current.focus();
      setSearchValue(searchValueCleaned); // rmeove whitespace
      setSearchError("Error message from practicum");
      return;
    }

    setSearchError(null);

    onSubmitFilter();

    const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()));


    // make an http request or do something else....

    // const formData = new FormData(event.target);
    // const search = formData.get("search");
    // console.log(formData.get("search"));

    // const formInputs = formElement.elements;
    // console.log("formElement", formElement);
    // console.log("formInputs", formInputs);
    // console.log(formElement.elements.search.value);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <img
            className="search__icon"
            src={icon}
            alt="Лупа, указывающая на строку поиска"
          />
          <label htmlFor="search" className="sr-only">
            Search Value
          </label>
          <input
            ref={searchInputRef}
            type="text"
            className="search__input"
            placeholder="Фильм"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleSearchValueChange}
            // required
            // aria - Accessible Rich Internet Applications
            aria-required="true"
            aria-invalid={searchError ? "true" : undefined}
            aria-errormessage={searchError ? "search-error" : undefined}
          />
          {searchError ? (
            <p role="alert" id="search-error">
              {searchError}
            </p>
          ) : null}
          <button className="search__button" type="submit">
            <img
              className="search__button-icon"
              src={button}
              alt="Галочка для отправки поискового запроса"
            />
          </button>
        </form>
        <FilterCheckBox />
      </div>
    </section>
  );
};

export default SearchForm;
