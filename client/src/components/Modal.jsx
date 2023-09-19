import React, { useState } from "react";
import axios from 'axios';
import data from '../assets/identifiers.json';

function Modal({ setOpenModal, userId, itemOfInterest, setEditButtonClicked }) {

  function handleSubmit(e) {
		e.preventDefault();
    let name = e.target.name.value;
    let review = e.target.review.value;
    let id = itemOfInterest;
    console.log('name: ', e.target.name.value);
    console.log('review: ', e.target.review.value);
    console.log('id: ', id);
    console.log('this is a another test');
    (async () => {
      try {
        const response = await axios.put('/edit-review', {
          name: e.target.name.value,
          review: e.target.review.value,
          user: userId,
          id: id
        });
        console.log('editReview - response: ', response);
        e.target.reset();
        setEditButtonClicked(true);
        setOpenModal(false);
      } catch (error) {
        console.error('editReview - error: ', error.response.data.message);
        setOpenModal(false);
      }
    })();
	}

  return (
    <div className="modalBackground">
      <div className="ModalForm" style={{ width: '96%' }}>
        <div className="Modal" style={{ height: '310px', padding: '25px 35px' }}>
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} className="reviewForm" style={{ top: 'unset' }}>
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
    </div>
  );
}

export default Modal;