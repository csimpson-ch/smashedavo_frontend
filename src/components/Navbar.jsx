import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../static/bootstrap.min.css';

// TODO - check https://reactrouter.com/en/main/start/overview#active-links for better routing

export default function Navbar () {

  function ItemLogin ({ username }) {
    if (username == null) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      )
    }
    return null
  }

  function ItemLogout ({ username }) {
    if (username == null) {
      return null
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/logout">Logout</a>
      </li>
    )
  }

  function ItemSignup ( {username} ) {
    if (username == null) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/signup">Signup</a>
        </li>
      )
    }
    return null
  }

  function ItemCreate ({username}) {
    if (username == null) {
      return null
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/create">Create</a>
      </li>
    )
  }

  function ItemExpenses({username}) {
    if (username == null) {
      return null
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/expenses">Expenses</a>
      </li>
    )
  }

  function ItemRegularPayments({username}) {
    if (username == null) {
      return null
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/regularpayments">Regular Payments</a>
      </li>
    )
  }

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Smashed Avacado</a>
              <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
                    
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog">Blog</Link>
                  </li>
                  <ItemLogin username={sessionStorage.getItem('username')}/>
                  <ItemCreate username={sessionStorage.getItem('username')}/>
                  <ItemExpenses username={sessionStorage.getItem('username')}/>
                  <ItemRegularPayments username={sessionStorage.getItem('username')}/>
                  <ItemSignup username={sessionStorage.getItem('username')}/>
                  <ItemLogout username={sessionStorage.getItem('username')}/>
                  
                </ul>
              </div>
          </div>
        </nav>
        <Outlet />
      </div>
  );
}
