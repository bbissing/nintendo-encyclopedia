import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import HomePage from './Homepage.jsx';
import logo from '../assets/nintendo-logo.png';
import axios from 'axios';

function Register(props) {
  const [formSubmitted, submitForm] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get('/get-reviews');
  //       console.log('response: ', response.data.rows);
  //       setItems(response.data.rows);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [formSubmitted]);

  function handleSubmit(e) {
		e.preventDefault();
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    // console.log('username: ', e.target.username.value);
    // console.log('email: ', e.target.email.value);
    // console.log('password: ', e.target.password.value);
    (async () => {
      try {
        const response = await axios.post('/create-user', {
          username,
          email,
          password
        });
        console.log('response: ', response);
        props.authenticate(true);
        // e.target.reset();
      } catch (error) {
        console.error(error);
        props.authenticate(false);
      }
    })();
  }

  return (
    <>
      <img className="nintendo_logo" src={logo} alt="nintendo logo"/>
      <div className="loginForm">
        <div className="loginModal" style={{height: '400px'}}>
          <Link to='/login'>
            <IoArrowBackOutline className="back-button" color={'#ffffff'} size={20} />
          </Link>
          <h3>SIGN UP</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                name="username"
                autoComplete="false"
                required
                type="text"
                placeholder="Username"
                maxLength="25"
              />
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                name="email"
                autoComplete="false"
                required
                type="text"
                placeholder="Email"
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                name="password"
                autoComplete="false"
                required
                type="password"
                placeholder="Password"
                maxLength="25"
              />
              <div>
                <button className='login-btn'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;