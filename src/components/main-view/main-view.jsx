import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setMovies, setUsers } from "../../actions/actions";

import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import "./main-view.scss";


import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
//import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";

const actions = { setMovies, setUsers };

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: "",
      token: ""
    };

    this.onLoggedIn = this.onLoggedIn.bind(this);
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
        this.props.setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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
    //if (!user) return <LoginView onLoggedIn={this.onLoggedIn} />;

    return (
      <Router>
        <Nav className="justify-content-end" activeKey="/">
          <Nav.Item>
            <Button className="submit">
              <Link to={`/`}>Movie List</Link>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button className="submit">
              <Link to={`/users/${user}`}>{user}</Link>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button className="submit" onClick={() => this.logOut()}>
              <Link to={`/`}>Log Out</Link>
            </Button>
          </Nav.Item>
        </Nav>
        <div className="main-view">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                return <MoviesList />;
              }}
            />
            <Route exact path="/register" render={() => <RegistrationView/>}
            />
          </Switch>
          <Route
            path="/users/:username"
            render={({ match }) => <ProfileView profile={match.params._id} />}
          />

          <Route
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView director={match.params.name} />
            )}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => <GenreView genre={match.params.name} />}
          />

          <Route
            path="/movies/:movieId"
            render={({ match }) => <MovieView movieId={match.params.movieId} />}
          />
        </div>
      </Router>
    );
  }
}
export default connect(
  null,
  actions
)(MainView);
