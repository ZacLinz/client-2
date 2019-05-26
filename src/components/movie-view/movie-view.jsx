import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { movie } = this.props;

    if (!movie) return null;

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

        <Row className="movie-genre">
          <Col lg="2" className="label">
            Genre:{" "}
          </Col>
          <Col className="value">{movie.genre.name}</Col>
          <Link to={`/genres/${movie.genre.name}`}>
            <Button className="submit" variant="link">Click here</Button>
          </Link>
        </Row>
        <Row className="movie-director">
          <Col lg="2" className="label">
            Director:{" "}
          </Col>
          <Col className="value">{movie.director.name}</Col>
          <Link to={`/directors/${movie.director.name}`}>
            <Button className = "submit" variant="link">Click here</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
