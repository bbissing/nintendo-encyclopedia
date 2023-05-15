import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nintendo-logo.png';
import HomePage from './Homepage.jsx';
import axios from 'axios';

function Login(props) {
  const [formSubmitted, submitForm] = useState(false);

  function handleSubmit(e) {
		e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log('email: ', email);
    console.log('password: ', password);
    (async () => {
      try {
        const response = await axios.post('/retrieve-user', {
          email,
          password
        });
        console.log('response: ', response);
        props.authenticate(true);
        // e.target.reset();
      } catch (error) {
        console.log(error);
        props.authenticate(false);
      }
    })();
  }

  return (
    <>
      <img className="nintendo_logo" src={logo} alt="nintendo logo"/>
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
                // value="bbissing@yahoo.com"
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
                // value="Weezy012"
              />
              <div>
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