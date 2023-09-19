import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from "react-icons";
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import data from '../assets/identifiers.json';
import axios from 'axios';

function SearchCharacter() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (isLoaded) {
          if (q.length > 0) {
            if (data[q.toLowerCase()] !== undefined) {
              const response = await axios.get('/get-character', {
                params: {
                  query: data[q.toLowerCase()]
                }
              });
              console.log(response.data);
              setItem(response.data);
              setIsLoaded(false);
            } else {
              setItem("");
              setIsLoaded(false);
              alert("Sorry, we're not able to find that character :(");
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isLoaded, q]);

  function handleClick() {
    setIsLoaded(true)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setIsLoaded(true);
    }
  }

  return (
    <>
      <div className="search_character_header">
        <div className="back-button">
          <Link to="/home">
            <IoArrowBackOutline color={'#262929'} size={30} />
          </Link>
        </div>
        <div className="search-wrap">
          <div className="search">
              <input
                  type="text"
                  name="search-form"
                  id="search-form"
                  className="searchTerm"
                  placeholder="Search any character"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={handleKeyDown}
              />
            <button type="submit" className="searchButton" onClick={handleClick}>
              <IconContext.Provider value={{ className: "magnify-glass" }}>
                  <FiSearch />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
      <>
        {typeof item === "object" ? (
          <div className="searchCharacterCard">
          <article>
              <div className="card-image">
                <img
                  src={item.image.thumb_url}
                  alt={item.name}
                />
              </div>
              <div className="card-content">
                  <h2 className="card-name">{item.name}</h2>
                  <ul className="card-list">
                    <span>{item.deck}</span>
                  </ul>
              </div>
          </article>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  )
}

export default SearchCharacter;