import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import data from '../assets/identifiers.json';
import axios from 'axios';
import defaultPic from '../assets/default_profile_pic.png';

function WriteReview(props) {
  // const [modalOpen, setModal] = useState(true);
  const [errorMessage, setError] = useState(false);
  const [name, setName] = useState('');
  // const [confirmation, setConfirmation] = useState(false);
  // console.log('props:', props);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let userId = 7;
  //       if (errorMessage) {
  //         console.log('this is a test');
  //         const response = await axios.post('/delete-review', {
  //           id: itemRemoved
  //         });
  //         const newItems = items.filter(item => item.id !== itemRemoved);
  //         console.log('newItems: ', newItems);
  //         setItems(newItems);
  //         removeItems(false);
  //       } else {
  //         const response = await axios.get('/get-reviews', {
  //           params: {
  //             userId: userId
  //           }
  //         });
  //         console.log('response: ', response.data.rows);
  //         setItems(response.data.rows);
  //       }
  //     } catch (error) {
  //       console.error(error.response.data.message);
  //     }
  //   })();
  // }, [values]);

  function handleSubmit(e) {
		e.preventDefault();
    let name = e.target.name.value;
    let review = e.target.review.value;
    setName(name);
    // let userId = props.userId;
    let userId = 7;
    let charId = Math.floor(Math.random() * 100) + 1;
    console.log('name: ', e.target.name.value);
    console.log('review: ', e.target.review.value);
    (async () => {
      try {
        let image = defaultPic;
        if (data[name.toLowerCase()] !== undefined) {
          const temp = await axios.get('/get-character', {
            params: {
              query: data[name.toLowerCase()]
            }
          })
          // if (temp.data.)
          image = temp.data.image.thumb_url;
          charId = data[name.toLowerCase()];
          // console.log('image: ', image);
        };
        const response = await axios.post('/post-review', {
          name: e.target.name.value,
          review: e.target.review.value,
          image: image,
          user: userId,
          char: charId
        });
        console.log('response: ', response);
        e.target.reset();
      } catch (error) {
        console.error(error.response.data.message);
        setError(true);
      }
    })();
    // setModal(false);
	}

  // function closeMessageModal() {
  //   setTimeout(
  //     () => setConfirmation(false),
  //     2000
  //   )
  // }

  function deleteReview() {
    //add logic to delete review from db
    //then set errorMessage to false
    (async() => {
      try {
        await axios.post('/delete-review', { name });
        alert("Your review has been deleted. Please write a new review.");
        setError(false);
        // setConfirmation(true);
        // closeMessageModal();
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
            <form onSubmit={handleSubmit}>
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
              <div className="inputField">
                <label htmlFor="review"></label>
                <input
                  id="review"
                  name="review"
                  autoComplete="false"
                  required
                  type="text"
                  placeholder="Write Your Review"
                  maxLength="300"
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

// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// var Input = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="Input">
// 				<label for={this.props.name}></label>
// 				<input id={this.props.name} autocomplete="false" required type={this.props.type} placeholder={this.props.placeholder} maxLength={this.props.maxlength}/>
// 			</div>
// 		);
// 	}
// });

// var Modal = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="Modal">
// 				<form onSubmit={this.props.onSubmit} className="ModalForm">
// 					<Input name="name" type="text" placeholder="Mario" />
// 					<Input name="review" type="text" placeholder="Write Your Review" maxlength="300"/>
// 					<button>Submit <i className="fa fa-fw fa-chevron-right"></i></button>
// 				</form>
// 			</div>
// 		);
// 	}
// });

// var App = React.createClass({

// 	getInitialState: function() {
// 		return { mounted: false };
// 	},

// 	componentDidMount: function() {
// 		this.setState({ mounted: true });
// 	},

// 	handleSubmit: function(e) {
// 		this.setState({ mounted: false });
// 		e.preventDefault();
// 	},

// 	render: function() {

// 		var child;
// 		if(this.state.mounted) {
// 			child = (<Modal onSubmit={this.handleSubmit} />);
// 		}

// 		return(
// 			<div className="App">
// 				<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
// 					{child}
// 				</ReactCSSTransitionGroup>
// 			</div>
// 		);
// 	}
// });

// ReactDOM.render(
// 	<App />,
// 	document.getElementById('app')
// );