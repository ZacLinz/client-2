import React from "react";
import axios from "axios";
//import { BrowserRouter as Router, Route } from "react-router-dom";
//import PropTypes from 'prop-types';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form';
//import Nav from 'react-bootstrap/Nav';

import "./profile-view.scss";

//import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
//import { MovieView } from '../movie-view/movie-view';
//import { RegistrationView } from '../registration-view/registration-view';
//import { DirectorView } from '../director-view/director-view';
//import { GenreView } from '../genre-view/genre-view';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: []
    };
  }

  handleDelete(token) {
    console.log(this.props);
    axios
      .delete(`https://my-movie-108.herokuapp.com/users/${this.props.profile.username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res);
        //localStorage.removeItem('token');
        //localStorage.removeItem('user');
      });
  }

  render() {
    console.log(this.props);
    const { profile } = this.props;
    return (
      <div>
        <Button className="submit" type="submit" onClick={this.handleDelete}>
          De-register {profile.username}?
        </Button>
      </div>
    );
  }
}
