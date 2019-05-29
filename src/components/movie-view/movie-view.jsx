import React from "react";
import { connect } from 'react-redux';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Card from 'react-bootstrap/Card';
//import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form';
//import { Link } from "react-router-dom";

function MovieView(props) {
  const { movies, movieId } = props

    if (!movies || !movies.length) return null;
                                    //should just be double = not triple
    const movie = movies.find(m => m._id == movieId)

    return (
      <Container className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <Row className="movie-title">
          <Col lg="2" className="label">
            Title:{" "}
          </Col>
          <Col className="value">{movie.title}</Col>
        </Row>
        <Row className="movie-description">
          <Col lg="2" className="label">
            Description:{" "}
          </Col>
          <Col className="value">{movie.description}</Col>
        </Row>

      </Container>
    );
  }
export default connect(({movies}) => ({movies}))(MovieView);
