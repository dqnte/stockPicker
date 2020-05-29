import React from 'react';
import axios from 'axios';

class Purchase extends React.Component {
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
    return (
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
    );
  }
}

export default Purchase;
