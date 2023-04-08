import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from "react-icons";



function SearchCharacter() {

  return (
    <div className="wrap">
      <div className="search">
        <input type="text" className="searchTerm" placeholder="Search any character"/>
        <button type="submit" className="searchButton">
          <IconContext.Provider value={{ className: "magnify-glass" }}>
              <FiSearch />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  )
}

export default SearchCharacter;