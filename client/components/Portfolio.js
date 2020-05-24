import React from 'react';

class Portfoilo extends React.Component {
  render() {
    const { user } = this.props;

    const portfolioSum = user.portfolioItems.reduce((total, item) => {
      return item.stock.latestPrice * item.quantity + total;
    }, 0);
    return (
      <div id="portfolio">
        <h3>{user.name}</h3>
        <h3>Portfoilo: {portfolioSum}</h3>
        {user.portfolioItems &&
          user.portfolioItems.map(item => (
            <h3 key={item.id}>
              {item.stock.symbol} - {item.quantity} Shares -{' '}
              {item.stock.latestPrice}
            </h3>
          ))}
      </div>
    );
  }
}

export default Portfoilo;
