import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Users from './Users';

class App extends Component {
  render() { 
    return (
      <div className="App">
        <h1>Welcome to Web Auth App</h1>

        <ul>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
        </ul>

        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/users" component={Users} />
        </div>
      </div>
    );
  }
}

export default App;
