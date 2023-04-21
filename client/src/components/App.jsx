import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Homepage.jsx';
import SearchCharacter from './SearchCharacter.jsx';
import SearchGames from './SearchGames.jsx';
import WriteReview from './WriteReview.jsx';
import MyReviews from './MyReviews.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/search-character" element={<SearchCharacter />}/>
      <Route path="/search-games" element={<SearchGames />}/>
      <Route path="/write-review" element={<WriteReview />}/>
      <Route path="/my-reviews" element={<MyReviews />}/>
    </Routes>
  )
}

export default App;