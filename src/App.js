import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Crosswords from "./components/Crosswords";
import Crossword from "./components/Crossword"
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      users: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  fetchUsers = () => {
    axios
      .get("http://localhost:3001/users")
      .then(response => {
        this.setState({users: response.data})
      })
  }

  handleSuccessfulAuth(data) {
    console.log(data);
    this.handleLogin(data);
    // this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", {
        withCredentials: true
      })
      .then(response => {
        this.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
    this.fetchUsers();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    console.log('users', this.state.users)
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus} user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path={"/login"}
              render={props => (
                <Login
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              )}
            />

            <Route
              exact
              path={"/registration"}
              render={props => (
                <Registration
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              )}
            />

            <Route
              exact
              path={"/crosswords"}
              render={props => (
                <Crosswords
                  {...props}
                  
                />
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}