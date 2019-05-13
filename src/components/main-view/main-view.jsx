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

import './main-view.scss'

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component{
  constructor(){
  super();

  this.state = {
    movies: [],
    user: []
  };
  }

  getMovies(token) {
    axios.get('https://my-movie-108.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token)
  }




  render(){
    const { movies, user } = this.state;

    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <Route exact path="/" render={() => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)
        }
        }/>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/users/:username" render={({match}) => {
          return <ProfileView user={user.find(u => u.username === match.params.username).user}/>}
        }/>
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m => m.director.name === match.params.name).director}/>}
          }/>
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre}/>}
          }/>
          {/*<Nav className="justify-content-end" activeKey="/">
            <Nav.Item>
              <Nav.Link href={`/users/${user.username}`}>{user.username}</Nav.Link>
            </Nav.Item>
          </Nav>*/}
      </Router>
    );
  }
}
