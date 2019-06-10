import React from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//import { Link } from "react-router-dom";

function GenreView(props) {
  const { movies, genre } = props;


  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m.genre.name == genre);
  console.log(movie)
    return (
      <Container className="movie-view">
        <Row className="genre-name">
          <Col lg="2" className="label">
            Genre Name:{" "}
          </Col>
          <Col className="value">{movie.genre.name}</Col>
        </Row>
        <Row className="genre-description">
          <Col lg="2" className="label">
            Description:{" "}
          </Col>
          <Col className="value">{movie.genre.description}</Col>
        </Row>
      </Container>
    );
  }
export default connect(({ movies }) => ({ movies }))(GenreView);
