
import React, { Component } from "react";
import axios from "axios";
import Nav from "./functional/Nav"
import Crosswords from "./Crosswords";
import {Link} from "react-router-dom";
import {Route, withRouter} from "react-router-dom";
import NewGame from "./functional/NewGame";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: [],
      puzzle: []
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/puzzles`)
      .then(response => {
        console.log('response puzzles', response.data)
        this.setState({
          puzzles: response.data,
          puzzle: response.data[0]
        })
      })

  }

  handleNewGame = () => {
    // this.props.history.push("/crossword")
    const newGame = this.state.puzzles[Math.floor(Math.random() * this.state.puzzles.length)]
    console.log('new game', newGame)
    this.setState({puzzle: newGame})
    this.props.history.push("/crosswords")
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
    console.log("Home", this.state.puzzle)
    return (
      <div>
        <Nav />
        <h1>Hello, {this.props.loggedInStatus}</h1>
        {!this.state.puzzle.length && <NewGame className="row" handleNewGame={this.handleNewGame}/>}
        <Route
          exact
          path={"/crosswords"}
          render={(props) => (
            <Crosswords
              {...props}
              puzzle={this.state.puzzle}
              hello={this.handleSuccessfulAuth}
            />
          )}
        />
      </div>
    );
  }
}

