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

  addToFavorites(token) {
    const { movie, username } = this.props;
    console.log({ token });
    axios
      .post(
        `https://my-movie-108.herokuapp.com/users/${username}/favorites/${
          movie._id
        }`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(res => {
        console.log(res);
      });
  }

  render() {
    const { movie, token } = this.props;
    return (
      <Card style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button variant="submit" onClick={() => this.addToFavorites(token)}>
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
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
