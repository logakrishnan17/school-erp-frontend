import React, { Component } from 'react';
import logo from "../logo.svg";
import { BrowserRouter as Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
          <div className="container">
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
            <br/>
          </div>
        )
    }
}