import React from 'react';

class Portfoilo extends React.Component {
  render() {
    const { user } = this.props;

    const portfolioSum = user.portfolioItems.reduce((total, item) => {
      return item.stock.latestPrice * item.quantity + total;
    }, 0);
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
          <form></form>
        </div>
      </React.Fragment>
    );
  }
}

export default Portfoilo;
