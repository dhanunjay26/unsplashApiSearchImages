import React, { useState } from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
   const {setSearchValue} = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if(searchValue) {
        console.log(searchValue);
        setSearchValue(searchValue);
    }
    return;
  };

  return (
    <section>
      <h1 className="title">Unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          className="form-input search-input"
          placeholder="cat"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
