import React from "react";
import { connect } from "react-redux";
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(m => m._id == movieId);
  console.log(movie)
  return (
    <div className= "d-flex justify-content-center">
    <Card className="movie-view" style={{ width: "50rem" }}>
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
        <Col>
        <Link to={`/genres/${movie.genre.name}`}>
          <Button className="submit btn-sm" variant="link">
            Click here
          </Button>
        </Link>
        </Col>
      </Row>
      <Row className="movie-director">
        <Col lg="2" className="label">
          Director:{" "}
        </Col>
        <Col className="value">{movie.director.name}</Col>
        <Col>
        <Link to={`/directors/${movie.director.name}`}>
          <Button className="submit btn-sm left" variant="link">
            Click here
          </Button>
        </Link>
        </Col>
      </Row>
    </Card>
    </div>
  );
}
export default connect(({ movies }) => ({ movies }))(MovieView);
