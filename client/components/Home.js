import React from 'react';
import { withRouter } from 'react-router-dom';

import Portolio from './Portfolio';
import Trades from './Trades';

import './home.scss';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { view: 0 };

    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname === '/trades') {
      this.setState({ view: 1 });
    }
  }

  changeView(view, viewName) {
    this.props.history.push('/' + viewName);
    this.setState({ view });
  }

  render() {
    const { view } = this.state;
    return (
      <div id="home">
        <div id="topbar">
          <div className="viewChoice">
            <span onClick={() => this.changeView(0, 'portfolio')}>
              PORTFOLIO
            </span>
            <span onClick={() => this.changeView(1, 'trades')}>TRADES</span>
            <span className="logout" onClick={() => this.props.logout()}>
              LOGOUT
            </span>
          </div>
        </div>

        {view === 0 && (
          <Portolio user={this.props.user} setUser={this.props.setUser} />
        )}
        {view === 1 && <Trades user={this.props.user} />}
      </div>
    );
  }
}

export default withRouter(Home);
