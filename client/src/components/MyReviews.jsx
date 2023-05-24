import React, { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { IoArrowBackOutline, IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import data from '../assets/identifiers.json';

function MyReviews(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState("");
  const [itemRemoved, removeItems] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let userId = 7;
        if (itemRemoved) {
          console.log('this is a test');
          const response = await axios.post('/delete-review', {
            id: itemRemoved
          });
          const newItems = items.filter(item => item.id !== itemRemoved);
          console.log('newItems: ', newItems);
          setItems(newItems);
          removeItems(false);
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
  }, [itemRemoved]);

  console.log('items: ', items);

  function handleClick(id) {
    // event.preventDefault();
    // console.log('event: ', event);
    console.log('id: ', id);
    removeItems(id);
  }

  return (
    <>
      <>
        <Link to="/home">
          <IoArrowBackOutline className="back-button" color={'#262929'} size={30} />
        </Link>
      </>
      <div className="reviews">
        {typeof items === "object" ? (
          items.map(item => (
            // <div className={`box ${isBoxVisible ? "" : " hidden"}`}>
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
                  <button type="submit" className="deleteButton" onClick={() => {handleClick(item.id)}}>
                  {/* <button type="submit" className="deleteButton"> */}
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
  )
}

export default MyReviews;