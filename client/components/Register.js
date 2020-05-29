import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { data } = await axios.post('/auth/register', {
      name: e.target.name.value,
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
        <h2>Join the fun</h2>
        <form onSubmit={this.handleSubmit} name="register">
          <div className="form-input">
            <label htmlFor="name">
              <small>Name</small>
            </label>
            <input name="name" type="text" required />
          </div>
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
          <a href="/login">Already have an account?</a>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
