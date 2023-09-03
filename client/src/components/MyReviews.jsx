import React, { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { IoArrowBackOutline, IoTrashOutline, IoPencil } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx';
import axios from 'axios';
import data from '../assets/identifiers.json';

function MyReviews(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState("");
  const [itemRemoved, removeItem] = useState(false);
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [itemOfInterest, setItemOfInterest] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let userId = 7;
        if (itemRemoved) {
          console.log('this is a test');
          const response = await axios.post('/delete-review', {
            id: itemOfInterest
          });
          const newItems = items.filter(item => item.id !== itemOfInterest);
          console.log('newItems: ', newItems);
          setItems(newItems);
          removeItem(false);
          setItemOfInterest('');
        } else if (editButtonClicked) {
          const response = await axios.get('/get-reviews', {
            params: {
              userId: userId
            }
          });
          console.log('new items after edit - response: ', response.data.rows);
          setEditButtonClicked(false);
        } else {
          const response = await axios.get('/get-reviews', {
            params: {
              userId: userId
            }
          });
          console.log('response: ', response.data.rows);
          setItems(response.data.rows);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    })();
  }, [itemRemoved, editButtonClicked]);

  console.log('items: ', items);

  function editReview(id) {
    // editItem(true);
    setOpenModal(true);
    setItemOfInterest(id);
  }

  function deleteReview(id) {
    // let event = e.target.classList[0];
    // event.preventDefault();
    // console.log('id: ', id);
    removeItem(true);
    setItemOfInterest(id);
  }

  return (
    <>
      {openModal ? (
        <Modal setOpenModal={setOpenModal} itemOfInterest={itemOfInterest} setEditButtonClicked={setEditButtonClicked} />
      ) : (
        <>
          <div className="my_reviews_header">
            <div className="back-button">
              <Link to="/home">
                <IoArrowBackOutline color={'#262929'} size={30} />
              </Link>
            </div>
          </div>
          <div className="reviews">
            {typeof items === "object" ? (
              items.map(item => (
                <div className="card" key={item.id}>
                  <article>
                    <div className={`${item.thumbnail_url.includes('localhost') ? 'card-image-default' : 'card-image'}`}>
                      <img
                        src={item.thumbnail_url}
                        alt={item.character_name}
                      />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name">{item.character_name}</h2>
                      <ul className="card-list">
                        <span>{item.review}</span>
                      </ul>
                    </div>
                    <div className="editReview">
                      <button type="submit" className="editButton" onClick={() => {editReview(item.id)}}>
                        <IconContext.Provider value={{ className: "pencil" }}>
                            <IoPencil />
                        </IconContext.Provider>
                      </button>
                    </div>
                    <div className="deleteReview">
                      <button type="submit" className="deleteButton" onClick={() => {deleteReview(item.id)}}>
                        <IconContext.Provider value={{ className: "trash-bin" }}>
                            <IoTrashOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default MyReviews;

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