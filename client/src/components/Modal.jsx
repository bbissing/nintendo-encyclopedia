import React, { useState } from "react";
import axios from 'axios';
import data from '../assets/identifiers.json';

function Modal({ setOpenModal, itemOfInterest, setEditButtonClicked }) {

  function handleSubmit(e) {
		e.preventDefault();
    let name = e.target.name.value;
    let review = e.target.review.value;
    // setName(name);
    // let userId = props.userId;
    let userId = 7;
    // let charId = Math.floor(Math.random() * 100) + 1;
    let id = itemOfInterest;
    console.log('name: ', e.target.name.value);
    console.log('review: ', e.target.review.value);
    console.log('id: ', id);
    console.log('this is a another test');
    (async () => {
      try {
        // let image = defaultPic;
        // if (data[name.toLowerCase()] !== undefined) {
        //   const temp = await axios.get('/get-character', {
        //     params: {
        //       query: data[name.toLowerCase()]
        //     }
        //   })
        //   // if (temp.data.)
        //   image = temp.data.image.thumb_url;
        //   charId = data[name.toLowerCase()];
        //   setCharID(charId);
        //   // console.log('image: ', image);
        // };
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
    // setModal(false);
	}

  return (
    <div className="modalBackground">
      <div className="ModalForm">
        <div className="Modal" style={{ height: '280px' }}>
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
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
      {/* <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div> */}
    </div>
  );
}

export default Modal;

{/* <div className="ModalForm">
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
        placeholder="Mario"
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
</div> */}