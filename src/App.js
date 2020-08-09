import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
// import logo from "./logo.svg";

import CreateStudent from "./components/create-student.component";
import StudentsList from "./components/student-list.component";
// import Navbar from "./components/navbar.component";
import Login from "./components/login.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <div className="container">
          <Route path="/list" exact component={StudentsList} />
          <Route path="/edit/:id" component={CreateStudent} />
          <Route path="/create" component={CreateStudent} />
        </div>
      </Router>
    );
  }
}

export default App;