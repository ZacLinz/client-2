import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

import './profile-view.scss'

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

export function ProfileView(props){
  const user = '';

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.delete(`https://my-movie-108.herokuapp.com/users/${this.state.user}`)
      .then(res => {
        console.log(res)
      })
    }

    return(
        <Form>
          <Form.Label> Please type in username to confirm you want to delete: </Form.Label>
          <Form.Control value={user}/>
          <Button className="submit" type="submit" onClick={handleSubmit}> Delete </Button>
        </Form>
    )
}
