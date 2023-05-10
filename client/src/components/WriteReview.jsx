import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import data from '../assets/identifiers.json';
import axios from 'axios';
import defaultPic from '../assets/default_profile_pic.png';

function WriteReview() {
  const [modalOpen, setModal] = useState(true);

  function handleSubmit(e) {
		e.preventDefault();
    let name = e.target.name.value;
    let review = e.target.review.value;
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
          image = temp.data.image.thumb_url;
          // console.log('image: ', image);
        };
        const response = await axios.post('/post-review', {
          name: e.target.name.value,
          review: e.target.review.value,
          image: image
        });
        console.log('response: ', response);
        e.target.reset();
      } catch (error) {
        console.error(error);
      }
    })();
    // setModal(false);
	}

  return (
    <>
      <Link to="/">
        <IoArrowBackOutline className="back-button" color={'#262929'} size={30} />
      </Link>
      {modalOpen ? (
        <div className="ModalForm">
          <div className="Modal">
            <form onSubmit={handleSubmit}>
              <div>
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
                <label htmlFor="review"></label>
                <input
                  id="review"
                  name="review"
                  autoComplete="false"
                  required
                  type="text"
                  placeholder="Write Your Review"
                  maxLength="300"/>
              </div>
              <div>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
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