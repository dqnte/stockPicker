import React from 'react';
import axios from 'axios';

import './portfolio.scss';
class Portfoilo extends React.Component {
  constructor() {
    super();
    this.submitBuy = this.submitBuy.bind(this);
  }

  async submitBuy(e) {
    e.preventDefault();
    const body = {
      symbol: e.target.symbol.value,
      quantity: e.target.quantity.value,
    };
    const { data } = await axios.post('/api/users/buy', body);
    this.props.setUser(data);
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
            />

            <input
              name="quantity"
              className="quantity"
              type="number"
              placeholder="Amount"
              required
            />
            <button type="submit">Buy</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Portfoilo;
