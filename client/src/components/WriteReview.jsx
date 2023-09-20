import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import data from '../assets/identifiers.json';
import axios from 'axios';
import defaultPic from '../assets/default_profile_pic.png';

function WriteReview(props) {
  const [errorMessage, setError] = useState(false);
  const [charID, setCharID] = useState('');
  const [userId, setUserID] = useState(props.userId);

  function handleSubmit(e) {
		e.preventDefault();
    let name = e.target.name.value;
    let review = e.target.review.value;
    let charId = '3003-' + Math.floor((Math.random() * 3000) + 30);

    (async () => {
      try {
        let image = defaultPic;

        if (data[name.toLowerCase()] !== undefined) {
          const temp = await axios.get('/get-character', {
            params: {
              query: data[name.toLowerCase()]
            }
          })

          image = temp.data.image.thumb_url;
          charId = data[name.toLowerCase()];

          setCharID(charId);
        };

        const response = await axios.post('/post-review', {
          name: e.target.name.value,
          review: e.target.review.value,
          image: image,
          user: userId,
          char: charId
        });

        e.target.reset();
      } catch (error) {
        setError(true);
      }
    })();
	}

  function deleteReview() {
    (async() => {
      try {
        await axios.post('/delete-review', { charID });
        alert("Your review has been deleted. Please write a new review.");
        setError(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <>
      <div className="write_review_header">
        <div className="back-button">
          <Link to="/home">
            <IoArrowBackOutline color={'#262929'} size={30} />
          </Link>
        </div>
      </div>
      {errorMessage ? (
        <div className="ModalForm">
          <div className="errorModal">
            <h3>You already written a review for this character</h3>
            <h4>Would you like to delete that review?</h4>
            <button className="deleteBtnYes" onClick={deleteReview}>Yes</button>
            <button className="deleteBtnNo" onClick={() => {setError(false)}}>No</button>
          </div>
        </div>
      ) : (
        <div className="ModalForm">
          <div className="Modal">
            <form onSubmit={handleSubmit} className="reviewForm">
              <div className="inputField">
                <label htmlFor="name"></label>
                <input
                  id="name"
                  name="name"
                  autoComplete="false"
                  required
                  type="text"
                  placeholder="Character Name (ex: Mario)"
                />
              </div>
              <div>
                <hr className="solid"></hr>
              </div>
              <div className="inputField">
                <label htmlFor="review"></label>
                <textarea
                  id="review"
                  name="review"
                  autoComplete="false"
                  required
                  type="text"
                  placeholder="Write Your Review"
                  maxLength="300"
                  rows="6"
                  cols="66"
                />
              </div>
              <div className="submitButton">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default WriteReview;