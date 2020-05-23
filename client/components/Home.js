import React from 'react';

class Home extends React.Component {
  render() {
    const { user } = this.props;
    return <h3>{user.email}</h3>;
  }
}

export default Home;
