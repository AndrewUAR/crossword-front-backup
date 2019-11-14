
import React, { Component } from "react";
import axios from "axios";
import Nav from "./functional/Nav"
import Crosswords from "./Crosswords";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }


  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    console.log(this.props)
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }


  render() {
    return (
      <div>
        <Nav />
        <h1>Hello, {this.props.loggedInStatus}</h1>
        <Crosswords />
      </div>
    );
  }
}