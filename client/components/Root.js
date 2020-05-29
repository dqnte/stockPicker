import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Routes from '../Routes';

import './root.scss';

class Root extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };

    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/auth/me');
    this.setState({ user: data });
  }

  setUser(user) {
    this.setState({ user });
  }

  logout() {
    axios.post('/auth/logout').then(() => {
      this.setState({ user: {} });
      this.props.history.push('/login');
    });
  }
  render() {
    return (
      <Routes
        user={this.state.user}
        setUser={this.setUser}
        logout={this.logout}
      />
    );
  }
}

export default withRouter(Root);
