import React from 'react';

import Routes from '../Routes';
class Root extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }
  render() {
    return <Routes user={this.state.user} setUser={this.setUser} />;
  }
}

export default Root;
