import React, { useState, useEffect } from 'react';

function App() {
  return (
    <>
      <h1>Learn All About Your Favorite Nintendo Characters</h1>
      <div className="first_row">
        <div className="first_card">
          <h4>Search Character</h4>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.</p> */}
        </div>
        <div className="second_card">
          <h4>Search Games</h4>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.</p> */}
        </div>
      </div>
      <div className="second_row">
        <div className="third_card">
          <h4>Write Review</h4>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.</p> */}
        </div>
        <div className="fourth_card">
          <h4>My Reviews</h4>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.</p> */}
        </div>
      </div>
    </>
  )
}

export default App;