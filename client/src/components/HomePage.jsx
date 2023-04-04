import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nintendo-logo.png';

function HomePage() {
  // const [newDestination, linkClicked] = useState('');

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.innerText);
  //   linkClicked(event.target.innerText);
  // }

  return (
    <>
      <img className="nintendo_logo" src={logo} alt="nintendo logo"/>
      <div className="first_row">
        <Link to="/search_character">
          <div className="first_card">
            <h4>Search Character</h4>
          </div>
        </Link>
        <Link to="/search_games">
          <div className="second_card">
            <h4>Search Games</h4>
          </div>
        </Link>
      </div>
      <div className="second_row">
        <Link to="/write_review">
          <div className="third_card">
            <h4>Write Review</h4>
          </div>
        </Link>
        <Link to="/my_reviews">
          <div className="fourth_card">
            <h4>My Reviews</h4>
          </div>
        </Link>
      </div>
    </>
  )
}

export default HomePage;