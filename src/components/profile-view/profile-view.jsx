import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }



  handleDelete(token){
    const { profile } = this.props;
    console.log(this.props);
    console.log("clicked");
    //axios.delete(`https://my-movie-108.herokuapp.com/users/${profile.username}`, {
      //  headers: { Authorization: `Bearer ${token}` }
      //})
      //.then(res => {
      //  localStorage.removeItem("token");
      //  localStorage.removeItem("user");
        //console.log(res);
    //  })
    ///  .catch(error => {
      //  console.log(error);
      //});
  }

  render() {
    if (!this.props.profile) return "loading profile...";
    const { profile, token } = this.props;
    return (
      <div>
        <Button
          className="submit"
          type="submit"
          onClick={this.handleDelete(token)}
        >
          De-register {profile.username}?
        </Button>
      </div>
    );
  }
}
