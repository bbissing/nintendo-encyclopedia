import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nintendo-logo.png';
import yoshi from '../assets/yoshi.png';
import mario from '../assets/mario.png';
import fox from '../assets/fox.png';
import rosalina from '../assets/rosalina.png';
import { IconContext } from "react-icons";
import { CiLogout } from 'react-icons/ci';
import axios from 'axios';


function HomePage(props) {

  function logOut() {
    props.logOut();
  }

  return (
    <>
      <div className="home_page_header">
        <div className="nintendo_logo">
          <img src={logo} alt="nintendo logo"/>
        </div>
        <div className="logout">
        <button type="submit" className="logoutButton" onClick={logOut}>
          <IconContext.Provider value={{ className: "logout" }}>
              <CiLogout />
          </IconContext.Provider>
        </button>
        </div>
      </div>
      <div className="top_row">
        <div className="cards">
          <Link to="/search-character">
            <div className="first_card">
              <h4>Search Character</h4>
              <div className="yoshi">
                <img src={yoshi} alt="yoshi"/>
              </div>
            </div>
          </Link>
        </div>
        <div className="cards">
          <Link to="/search-games">
            <div className="second_card">
              <h4>Search Games</h4>
              <div className="mario">
                <img src={mario} alt="mario"/>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="bottom_row">
        <div className="cards">
          <Link to="/write-review">
            <div className="third_card">
              <h4>Write Review</h4>
              <div className="fox">
                <img src={fox} alt="fox"/>
              </div>
            </div>
          </Link>
        </div>
        <div className="cards">
          <Link to="/my-reviews">
            <div className="fourth_card">
              <h4>My Reviews</h4>
              <div className="rosalina">
                <img src={rosalina} alt="rosalina"/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage;