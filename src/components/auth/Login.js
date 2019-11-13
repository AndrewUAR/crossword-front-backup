import React, { Component } from "react";
import axios from "axios";
import Nav from "../functional/Nav";
import {Link} from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            username: username,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.history.push("/dashboard")
          this.props.handleSuccessfulAuth(response.data);
        } else {

        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    console.log('error', this.state.loginErrors)
    return (
      <div>
        <Nav />
        <div className="col-md-4 offset-md-4 mt-3 login">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group" onSubmit={this.handleSubmit}>
              <label>Username</label>
              <input 
                type="username"
                name="username" 
                className="form-control"  
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password"
                name="password" 
                className="form-control"  
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary col-sm-4 login-button">Login</button>
            <Link className="btn btn-primary col-sm-4" to="/registration" type="submit">Sign up</Link>
          </form>
        </div>
      </div>
    );
  }
}