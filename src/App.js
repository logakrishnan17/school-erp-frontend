import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";

import CreateStudent from "./components/create-student.component";
import EditStudent from "./components/edit-student.component";
import StudentsList from "./components/student-list.component";
import Navbar from "./components/navbar.component";
import Login from "./components/login.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <div className="container">
          {/* <Navbar /> */}
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">School ERP App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Student</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/payment" className="nav-link">Payment History</Link>
                </li>
              </ul>
            </div>
          </nav> */}
          <Route path="/list" exact component={StudentsList} />
          <Route path="/edit/:id" component={EditStudent} />
          <Route path="/create" component={CreateStudent} />
        </div>
      </Router>
    );
  }
}

export default App;