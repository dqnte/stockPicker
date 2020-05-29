import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './authForm.scss';

class Login extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { data } = await axios.post('/auth/login', {
      email: e.target.email.value,
      password: e.target.password.value,
    });

    if (data.id) {
      this.props.setUser(data);
      this.props.history.push('/portfolio');
    }
  }

  render() {
    return (
      <div className="form-container">
        <h2>Welcome to blah blah blah</h2>
        <form onSubmit={this.handleSubmit} name="login">
          <div className="form-input">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" required />
          </div>
          <div className="form-input">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" required />
          </div>
          <a href="/register">Are you new to the site?</a>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
