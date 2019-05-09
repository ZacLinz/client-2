import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component{
  constructor(){
    super();

    this.state={};
  }
  render(){
    const {movie} = this.props;

    if (!movie) return null;

    return(
      <Container className="movie-view">
        <Row className="director-name">
          <Col lg="2" className="label">Name </Col>
          <Col className="value">{movie.director.name}</Col>
        </Row>
        <Row className="director-bio">
          <Col lg="2" className="label">Bio </Col>
          <Col className="value">{movie.director.bio}</Col>
        </Row>
        <Row className="director-birth">
          <Col lg="2" className="label">Birthyear </Col>
          <Col className="value">{movie.director.birth}</Col>
        </Row>
      </Container>

    );
  }
}
