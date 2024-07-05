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

        <div className="container">
          <div className="row">
            <div className="col-md-auto">
              <nav id="sidebarMenu" class="collapse d-lg-block sidebar bg-white">
                <div class="list-group list-group-flush mx-3 mt-4">
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                    <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple active">
                    <i class="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-lock fa-fw me-3"></i><span>Password</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple">
                    <i class="fas fa-chart-pie fa-fw me-3"></i><span>SEO</span>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-globe fa-fw me-3"></i><span>International</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-building fa-fw me-3"></i><span>Partners</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-calendar fa-fw me-3"></i><span>Calendar</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-users fa-fw me-3"></i><span>Users</span></a>
                  <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
                      class="fas fa-money-bill fa-fw me-3"></i><span>Sales</span></a>
                </div>
              </nav>
            </div>

            <div className="col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
  );
}
