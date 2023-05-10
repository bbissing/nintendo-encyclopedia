import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import data from '../assets/identifiers.json';

function MyReviews() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/get-reviews');
        console.log('response: ', response.data.rows);
        setItems(response.data.rows);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log('items: ', items);

  return (
    <>
      <>
        <Link to="/">
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