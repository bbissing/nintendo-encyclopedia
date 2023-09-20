import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login.jsx';
import Register from './Register.jsx';
import HomePage from './HomePage.jsx';
import SearchCharacter from './SearchCharacter.jsx';
import SearchGames from './SearchGames.jsx';
import WriteReview from './WriteReview.jsx';
import MyReviews from './MyReviews.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx';

function App() {
  const [userId, setUserId] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === '') {
      axios.get('/validate')
      .then((result) => {
        setUserId(result.data.id);
        navigate('/home');
      })
      .catch((err) => {
        // console.log('Please register or login.');
      });
    }
  }, []);

  const logOut = () => {
    axios.get('/logout');
    navigate('/');
  };

  const authenticate = (isUser) => {
    if (isUser) {
      setUserId(isUser.data.rows[0].id);
      navigate('/home');
    } else {
      setLoginFailure(true);
      // console.log('Incorrect email or password. Try again');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login authenticate={authenticate} loginFailure={loginFailure} />}/>
      <Route path="/register" element={<Register authenticate={authenticate} loginFailure={loginFailure} />}/>
      <Route element={<ProtectedRoute userId={userId}/>}>
        <Route path="/home" element={<HomePage logOut={logOut}/>}/>
        <Route path="/search-character" element={<SearchCharacter />}/>
        <Route path="/search-games" element={<SearchGames />}/>
        <Route path="/write-review" element={<WriteReview userId={userId} />}/>
        <Route path="/my-reviews" element={<MyReviews userId={userId} />}/>
      </Route>
    </Routes>
  )
}

export default App;