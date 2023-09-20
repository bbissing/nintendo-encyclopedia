import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nintendo-logo.png';
import HomePage from './HomePage.jsx';
import axios from 'axios';

function Login(props) {
  const [formSubmitted, submitForm] = useState(false);

  function handleSubmit(e) {
		e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    (async () => {
      try {
        const response = await axios.post('/retrieve-user', {
          email,
          password
        });

        props.authenticate(response);
      } catch (error) {
        props.authenticate(false);
      }
    })();
  }

  return (
    <>
      <div className="login_header">
        <div className="nintendo_logo">
          <img src={logo} alt="nintendo logo"/>
        </div>
      </div>
      <div className="loginForm">
        <div className="loginModal">
          <h3>LOGIN</h3>
          <form onSubmit={handleSubmit}>
            <div>
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
                <Link to='/register'>
                  <button className='signUp-btn'><span className='signUp-btn-link'>Sign Up</span></button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;