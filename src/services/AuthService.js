import decode from 'jwt-decode';
import * as service from './service';

export default class AuthService {
  constructor(domain) {
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }
  login(user) {
    return service.login(user).then(res => {
      if (res.token) {
        this.setToken(res.token)
      }
      return Promise.resolve(res);
    })
  }
  loggedIn() {
    const token = this.getToken()
    return !!token
    // && !this.isTokenExpired(token) 
  }
  setToken(Token) {
    localStorage.setItem('token', Token)
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logout() {
    localStorage.removeItem('token');
  }
  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}