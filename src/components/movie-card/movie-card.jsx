import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  //constructor(){
  //super();
  //}

  addToFavorites() {
    const { movie} = this.props;
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log({ token });
    axios
      .post(
        `https://my-movie-108.herokuapp.com/users/${user}/favorites/${
          movie._id
        }`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;
    return (
      <div className= "d-flex justify-content-center">
      <Card  className= "movie-card" style={{ width: "32rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button variant="submit" onClick={() => this.addToFavorites()}>
            Add to Favorites
          </Button>
          <Link to={`directors/${movie.director.name}`}>
            <Card.Text>{movie.director.name}</Card.Text>
          </Link>
          <Link to={`genres/${movie.genre.name}`}>
            <Card.Text>{movie.genre.name}</Card.Text>
          </Link>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
