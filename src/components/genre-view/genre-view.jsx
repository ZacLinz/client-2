import React from "react";
//import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="movie-view">
        <Row className="genre-name">
          <Col lg="2" className="label">
            Genre Name:{" "}
          </Col>
          <Col className="value">{genre.name}</Col>
        </Row>
        <Row className="genre-description">
          <Col lg="2" className="label">
            Description:{" "}
          </Col>
          <Col className="value">{genre.description}</Col>
        </Row>
      </Container>
    );
  }
}
