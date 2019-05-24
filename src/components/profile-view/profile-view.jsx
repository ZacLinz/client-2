import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      birthday: "",
      password: "",
      confirmPassword: ""
      //favorites: []
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

//  showFavorites(){
//  const {profile, movies} = this.props;
//  const movieId = movies.map(m => m._id)
//  for (i)



  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }
  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }
  onBirthdayChange(event) {
    this.setState({
      birthday: event.target.value
    });
  }
  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }
  onConfirmPasswordChange(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  handleUpdate(token) {
    const { profile } = this.props;
    const { username, email, birthday, password, confirmPassword } = this.state;
    axios({
      method: "put",
      url: `https://my-movie-108.herokuapp.com/users/${profile.username}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        username: username,
        email: email,
        birthday: birthday,
        password: password,
        confirmPassword: confirmPassword
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        localStorage.setItem("user", data.username);
      })
      .catch(e => {
        console.log("error updating the user");
      });
  }

  handleDelete(token) {
    const { profile } = this.props;
    console.log(this.props);
    axios
      .delete(`https://my-movie-108.herokuapp.com/users/${profile.username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    if (!this.props.profile) return "loading profile...";

    const { profile, movies, token} = this.props;
  //  const favorite = [];

  //  const isFavorite = profile.favorites.find(id => id === movies._id)
    //if (isFavorite === movies._id){
//      favorite.push(isFavorite);
//    }
//      console.log(favorite)

  //  if (movies._id === profile.find(profile.favorites)){
    //  this.setState({
    //    favorites: this.state.favorites.concat(movies)
//})
  //  };
    //function isFavorite(movie){
    //  return movie._id = profile.favorites
  //  };

  //  const favorites = movies.filter(isFavorite);

    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Text>{favoriteMovies.title}</Card.Text>
          </Card.Body>
        </Card>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={this.state.username}
              onChange={this.onUsernameChange}
              placeholder="Enter username to update"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={this.onEmailChange}
              placeholder="Enter New Email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={this.state.birthday}
              onChange={this.onBirthdayChange}
              placeholder="yyyy-mm-dd"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              placeholder="Enter New Password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.confirmPassword}
              onChange={this.onConfirmPasswordChange}
              placeholder="Re-enter Password"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => this.handleUpdate(token)}
          >
            Update Profile
          </Button>
        </Form>
        <Button className="submit" onClick={() => this.handleDelete(token)}>
          De-register {profile.username}?
        </Button>
      </div>
    );
  }
}
