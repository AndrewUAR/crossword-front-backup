import React from 'react'
import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props){
    super(props)


    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", {
        withCredentials: true
      })
      .then(response => {
        this.props.history.push('/')
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }
  render(){
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <h1>Status: {this.props.loggedInStatus}</h1>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </div>
      </div>
    )
  }
}

export default Dashboard;