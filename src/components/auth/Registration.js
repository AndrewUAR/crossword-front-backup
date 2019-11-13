import React, { Component } from "react";
import axios from "axios";
import Nav from '../functional/Nav'

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    const { username, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            username: username,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.history.push("/login")
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  routeChange = () => {
    this.props.history.push("/login")
  }

  render() {
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
                name="password_confirmation" 
                className="form-control"  
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
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
            <button type="submit" className="btn btn-primary col-sm-4 sing-button" >Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}