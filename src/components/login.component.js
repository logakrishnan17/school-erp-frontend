import React, { Component } from 'react';
import AuthService from '../services/AuthService'

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

    this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.Auth = new AuthService();
	}

  componentDidMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/list');
  }

	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		let loginData = {
      email: this.state.email,
      password: this.state.password
    }

    this.Auth.login(loginData)
    .then(response => {
      
      if(response && response.status && response.status.code === 200) {
        this.Auth.setToken(response.token);
        this.props.history.replace('/list');
      }
    })
    .catch(function (error){
        console.log(error);
    })
	}

	render() {
		return (
			<div id="login">
				<h3 className="text-center text-white pt-5">Login form</h3>
				<div className="container">
					<div id="login-row" className="row justify-content-center align-items-center">
						<div id="login-column" className="col-md-6">
							<div id="login-box" className="col-md-12">
								<form onSubmit={this.onSubmit}>
									<h3 className="text-center text-info">Login</h3>
									<div className="form-group">
										<label htmlFor="username" className="text-info">
											Username:
										</label>
										<br />
										<input type="text" name="username" id="username" className="form-control"
                      value={this.state.email}
							        onChange={this.onChangeEmail}
                    />
									</div>
									<div className="form-group">
										<label htmlFor="password" className="text-info">
											Password:
										</label>
										<br />
										<input type="password" name="password" id="password" className="form-control"
                      value={this.state.password}
							        onChange={this.onChangePassword}
                    />
									</div>
									<div className="form-group text-center">
										<input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}