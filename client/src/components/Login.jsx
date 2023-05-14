import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nintendo-logo.png';

function Login() {

  function handleSubmit(e) {
		e.preventDefault();
    // let name = e.target.name.value;
    // let review = e.target.review.value;
    // console.log('name: ', e.target.name.value);
    // console.log('review: ', e.target.review.value);
    // (async () => {
    //   try {
    //     let image = defaultPic;
    //     if (data[name.toLowerCase()] !== undefined) {
    //       const temp = await axios.get('/get-character', {
    //         params: {
    //           query: data[name.toLowerCase()]
    //         }
    //       })
    //       image = temp.data.image.thumb_url;
    //       // console.log('image: ', image);
    //     };
    //     const response = await axios.post('/post-review', {
    //       name: e.target.name.value,
    //       review: e.target.review.value,
    //       image: image
    //     });
    //     console.log('response: ', response);
    //     e.target.reset();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  }


  return (
    <>
      <img className="nintendo_logo" src={logo} alt="nintendo logo"/>
      <div className="loginForm">
        <div className="loginModal">
          <h3>LOGIN</h3>
          <form onSubmit={handleSubmit}>
            <div>
              {/* <p>EMAIL</p> */}
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
              {/* <p>PASSWORD</p> */}
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