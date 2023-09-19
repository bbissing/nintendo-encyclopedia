import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import HomePage from './HomePage.jsx';
import logo from '../assets/nintendo-logo.png';
import axios from 'axios';

function Register(props) {
  const [formSubmitted, submitForm] = useState(false);

  function handleSubmit(e) {
		e.preventDefault();
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    (async () => {
      try {
        const response = await axios.post('/create-user', {
          username,
          email,
          password
        });
        console.log('response: ', response);
        props.authenticate(true);
      } catch (error) {
        console.error(error);
        props.authenticate(false);
      }
    })();
  }

  return (
    <>
      <div className="register_header">
        <div className="nintendo_logo">
          <img src={logo} alt="nintendo logo"/>
        </div>
      </div>
      <div className="loginForm">
        <div className="loginModal" style={{height: '416px'}}>
          <h3>SIGN UP</h3>
          <form onSubmit={handleSubmit}>
            <div className="signupForm">
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
              <div className="submit">
                <button className='login-btn'>Submit</button>
                <p className='existingUserConfirmation'>Already Have an Account?</p>
                <Link to='/'>
                  <button className='login-page-btn'><span className='login-page-btn-link'>Click Here to Login</span></button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;