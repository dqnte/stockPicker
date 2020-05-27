import React from 'react';
import axios from 'axios';

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
    console.log(user);
    var portfolioSum;
    if (user.portfolioItems) {
      portfolioSum = user.portfolioItems.reduce((total, item) => {
        return item.stock.latestPrice * item.quantity + total;
      }, 0);
    } else {
      portfolioSum = 0;
    }
    return (
      <React.Fragment>
        <div id="portfolio">
          <h3>{user.name}</h3>
          <h3>Portfoilo: {portfolioSum}</h3>
          {user.portfolioItems &&
            user.portfolioItems.map(item => (
              <h3 key={item.id}>
                {item.stock.symbol} - {item.quantity} Shares -{' '}
                {Math.floor(item.stock.latestPrice, -2)}
              </h3>
            ))}
        </div>
        <div id="Purchase">
          <h3>Cash ${user.balance / 100}</h3>
          <form onSubmit={this.submitBuy}>
            <label htmlFor="symbol">
              <small>Symbol</small>
            </label>
            <input name="symbol" type="text" required />
            <label htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input name="quantity" type="number" required />
            <button type="submit">Buy</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Portfoilo;
