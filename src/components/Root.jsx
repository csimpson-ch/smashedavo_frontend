import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../static/bootstrap.min.css';

// TODO - check https://reactrouter.com/en/main/start/overview#active-links for better routing

export default function Root () {

  function ItemLogin ({ username }) {
    if (username == null) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
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
        <Link className="nav-link" to="/logout">Logout</Link>
      </li>
    )
  }

  function ItemSignup ( {username} ) {
    if (username == null) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
      )
    }
    return null
  }


  function Topbar() {
      return (
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
                  <ItemSignup username={sessionStorage.getItem('username')}/>
                  <ItemLogout username={sessionStorage.getItem('username')}/>
                </ul>
              </div>
          </div>
        </nav>
      )
  }


  function Sidebar({username}) {

    if (username == null) {
      return null;
    } else {
      return (
        
          <nav className='navbar navbar-dark bg-light'>
            <ul className="nav flex-sm-column">
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/expenses" className="nav-link">
                  Expenses
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/regularpayments" className="nav-link">
                  Regular Payments
                </Link>
              </li>
            </ul>
          </nav>
      )
    }
  }

  return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <Topbar username={sessionStorage.getItem('username')}/>
          </div>
          <div className="row">
            <div className="col-2">
              <Sidebar username={sessionStorage.getItem('username')}/>
            </div>
            <div className="col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
  );
}
