import React from 'react';
import '../static/bootstrap.min.css';


export default function Navbar () {

  function ItemLogin ({ username }) {
    if (username == null) {
      return (
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
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
      <li class="nav-item">
        <a class="nav-link" href="/logout">Logout</a>
      </li>
    )
  }

  function ItemSignup ( {username} ) {
    if (username == null) {
      return (
        <li class="nav-item">
          <a class="nav-link" href="/signup">Signup</a>
        </li>
      )
    }
    return null
  }

  function ItemExpenses({username}) {
    if (username == null) {
      return null
    }
    return (
      <li class="nav-item">
        <a class="nav-link" href="/expenses">Expenses</a>
      </li>
    )
  }

  function ItemRegularPayments({username}) {
    if (username == null) {
      return null
    }
    return (
      <li class="nav-item">
        <a class="nav-link" href="/regularpayments">Regular Payments</a>
      </li>
    )
  }

  return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Smashed Avacado</a>
              <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                    
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a class="nav-link" href="/blog">Blog</a>
                  </li>
                  <ItemLogin username={sessionStorage.getItem('username')}/>
                  <ItemExpenses username={sessionStorage.getItem('username')}/>
                  <ItemRegularPayments username={sessionStorage.getItem('username')}/>
                  <ItemSignup username={sessionStorage.getItem('username')}/>
                  <ItemLogout username={sessionStorage.getItem('username')}/>
                  
                </ul>
              </div>
          </div>
        </nav>
      </div>
  );
}
