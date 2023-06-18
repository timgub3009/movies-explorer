import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  const [isShort, setIsShort] = React.useState(false);

  return (
    <div className="filter">
      <label htmlFor="is-short" className="filter__checkbox">
      <p className="filter__text">Короткометражки</p> 
        <input
          id="is-short"
          name="is-short"
          type="checkbox"
          checked={isShort}
          onChange={(event) => setIsShort(event.target.checked)}
          className="filter__input"
        />
        <span className="filter__toggler" />
      </label>
      {/* <p className="filter__text"></p> */}
    </div>
  );
};

export default FilterCheckbox;
