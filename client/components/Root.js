import React from 'react';
import axios from 'axios';

import Routes from '../Routes';
class Root extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };

    this.setUser = this.setUser.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/auth/me');
    this.setState({ user: data });
  }

  setUser(user) {
    this.setState({ user });
  }
  render() {
    return <Routes user={this.state.user} setUser={this.setUser} />;
  }
}

export default Root;
