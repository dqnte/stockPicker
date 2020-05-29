import React from 'react';
import axios from 'axios';

import './portfolio.scss';
class Portfoilo extends React.Component {
  constructor() {
    super();
    this.state = { symbol: '', quantity: '' };
    this.submitBuy = this.submitBuy.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async submitBuy(e) {
    e.preventDefault();
    const body = {
      symbol: this.state.symbol,
      quantity: this.state.quantity,
    };

    const { data } = await axios.post('/api/users/buy', body);
    this.props.setUser(data);
    this.setState({ symbol: '', quantity: '' });
  }

  render() {
    const { user } = this.props;
    var portfolioSum;
    if (user.portfolioItems) {
      portfolioSum = user.portfolioItems.reduce((total, item) => {
        return item.stock.latestPrice * item.quantity + total;
      }, 0);
    } else {
      portfolioSum = 0;
    }

    var list;
    if (user.portfolioItems.length === 0) {
      list = (
        <div className="empty-tag">You have no stocks in your portfolio...</div>
      );
    } else {
      list = (
        <ul className="stock-list">
          {user.portfolioItems &&
            user.portfolioItems.map(item => {
              let className;

              if (
                item.stock.open === null ||
                item.stock.open === item.stock.latestPrice
              ) {
                className = '';
              } else if (item.stock.latestPrice > item.stock.open) {
                className = 'gain';
              } else {
                className = 'loss';
              }

              return (
                <li key={item.id} className="portfolio-item">
                  {item.stock.symbol} - {item.quantity} Shares
                  <span className={className}>
                    {(item.stock.latestPrice * item.quantity).toFixed(2)}
                  </span>
                </li>
              );
            })}
        </ul>
      );
    }
    return (
      <div id="portfolio">
        <div id="items">
          <div className="header">
            <span className="title">Portfoilo:</span>{' '}
            <span className="total">
              $(
              {portfolioSum.toFixed(2)})
            </span>
          </div>
          {list}
        </div>
        <div id="purchase">
          <div className="header">
            <span className="title">Cash:</span>{' '}
            <span className="total">${(user.balance / 100).toFixed(2)}</span>
          </div>
          <form onSubmit={this.submitBuy}>
            <input
              name="symbol"
              className="symbol"
              type="text"
              placeholder="Symbol"
              required
              value={this.state.symbol}
              onChange={this.handleChange}
            />
            <input
              name="quantity"
              className="quantity"
              type="number"
              placeholder="Amount"
              required
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button type="submit">Buy</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Portfoilo;
