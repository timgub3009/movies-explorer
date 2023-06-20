import React from "react";
import button from "../../images/search_btn.svg";
import icon from "../../images/search-icon.svg";
import "./SearchForm.css";
import safeStorage from "../../utils/safe-storage";

const SearchForm = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchError, setSearchError] = React.useState(null);
  const searchInputRef = React.useRef(null);
  const [isShort, setIsShort] = React.useState("");

  React.useEffect(() => {
    const maybeInitialSearchValue = safeStorage.getItem("searchValue")?.trim();
    if (maybeInitialSearchValue) {
      setSearchValue(maybeInitialSearchValue);
      onSearch(
        { searchValue: maybeInitialSearchValue },
        /*searchIfLocalStorageHasMovies=*/ true
      );
    }
  }, [onSearch]);

  const handleSearchValueChange = (event) => {
    const value = event.target.value;
    safeStorage.setItem("searchValue", value);
    setSearchValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValueCleaned = searchValue.trim();

    if (searchValueCleaned.length === 0) {
      searchInputRef.current.focus();
      setSearchValue(searchValueCleaned); // remove whitespace
      setSearchError("Введите хотя бы одну букву(");
      return;
    }

    setSearchError(null);
    onSearch({
      searchValue: searchValueCleaned,
      isShort,
    });
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
            aria-required="true"
            aria-invalid={searchError ? "true" : undefined} // aria - Accessible Rich Internet Applications
            aria-errormessage={searchError ? "search-error" : undefined}
          />
          {searchError ? (
            <p role="alert" id="search-error" className="search__error">
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
        <div className="filter">
          <label htmlFor="is-short" className="filter__checkbox">
            <p className="filter__text">Короткометражки</p>
            <input
              id="is-short"
              name="is-short"
              type="checkbox"
              checked={isShort}
              onChange={(event) => {
                setIsShort(event.target.checked);
                onSearch({ searchValue, isShort: event.target.checked });
              }}
              className="filter__input"
            />
            <span className="filter__toggler" />
          </label>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
