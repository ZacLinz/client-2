import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
//import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form';

//import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  //constructor(){
  //super();
  //}

  addToFavorites() {
    const { movie, username, token } = this.props;
    console.log({token});
    axios
      .post(
        `https://my-movie-108.herokuapp.com/users/${username}/favorites/${
          movie._id}`, null,
        {headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;
    return (
      <Card style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>

          
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
