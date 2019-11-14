import React from 'react';
import {Link} from 'react-router-dom'

const Nav = props => {
  return (
    <div>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">We Solvin'</Link>
        <form className="form-inline">
          <Link className="btn btn-outline-success my-2 my-sm-0" to="/login" type="submit">Login</Link>
        </form>
      </nav>
    </div>
  )
}

export default Nav