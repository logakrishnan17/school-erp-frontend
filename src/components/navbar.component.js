import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import AuthService from '../services/AuthService';

import logo from '../logo.svg';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
		this.handleAddStudent = this.handleAddStudent.bind(this);
    this.handleListStudent = this.handleListStudent.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }

  handleAddStudent(e) {
    return this.props.history.push('/create');
  }

  handleListStudent(e) {
    return this.props.history.push('/list');
  }

  handleLogout(e) {
    this.Auth.logout();
    return this.props.history.push('/');
  }

	render() {
		return (
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span>
            <img src={logo} width="30" height="30" alt="" />
            <Link to="/list" className="navbar-brand">
              School ERP
            </Link>
          </span>

					<NavDropdown title="Student">
						<NavDropdown.Item eventKey="1.1" onSelect={this.handleAddStudent}>
                Add Student
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="1.1" onSelect={this.handleListStudent}>
                List Students
            </NavDropdown.Item>
					</NavDropdown>

          {/* <NavDropdown title="Class">
          <span></span>
						<NavDropdown.Item eventKey="2.1">Create Class</NavDropdown.Item>
            <NavDropdown.Item eventKey="2.2">List Class</NavDropdown.Item>
					</NavDropdown> */}

          <button className="btn-danger" onClick={this.handleLogout}>Logout</button>
				</nav>
				<br />
			</div>
		);
	}
}
