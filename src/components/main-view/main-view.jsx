import React from "react";
import axios from "axios";

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

//import Nav from "react-bootstrap/Nav";
//import { Link } from "react-router-dom";

import "./main-view.scss";

    //will need to make this one
import MoviesList from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view";
//import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
//import { DirectorView } from "../director-view/director-view";
//import { GenreView } from "../genre-view/genre-view";
//import { ProfileView } from "../profile-view/profile-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: "",
      token: ""
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      this.getUsers(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://my-movie-108.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
        })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUsers(token) {
    axios
      .get("https://my-movie-108.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }



  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  render() {

    const { user } = this.state;

    if (!user) return <LoginView onLoggedIn={this.onLoggedIn}/>;

    return (
      <Router>

        <div className="main-view">
        <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList/>;
        }}
        />

        <Route path="/register" render={() => <RegistrationView />} />

        <Route
          path="/movies/:movieId"
          render={({ match }) =>
            <MovieView
              movieId={match.params.movieId}/>}/>
        </div>
      </Router>
    );
  }
}
 export default connect(null, { setMovies } )(MainView);
