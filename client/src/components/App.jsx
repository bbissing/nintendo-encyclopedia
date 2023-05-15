import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './Login.jsx';
import Register from './Register.jsx';
import HomePage from './Homepage.jsx';
import SearchCharacter from './SearchCharacter.jsx';
import SearchGames from './SearchGames.jsx';
import WriteReview from './WriteReview.jsx';
import MyReviews from './MyReviews.jsx';

function App() {
  // const [userId, setUserId] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);
  const navigate = useNavigate();
  // const cookies = new Cookies();

  const authenticate = (isUser) => {
    if (isUser) {
      navigate('/home');
    } else {
      setLoginFailure(true);
      console.log('Incorrect email or password. Try again');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login authenticate={authenticate} loginFailure={loginFailure} />}/>
      <Route path="/register" element={<Register authenticate={authenticate} loginFailure={loginFailure} />}/>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/search-character" element={<SearchCharacter />}/>
      <Route path="/search-games" element={<SearchGames />}/>
      <Route path="/write-review" element={<WriteReview />}/>
      <Route path="/my-reviews" element={<MyReviews />}/>
    </Routes>
  )
}

export default App;