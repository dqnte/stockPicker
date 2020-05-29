import React from 'react';

import Purchase from './Purchase';

import './portfolio.scss';
const Portfoilo = props => {
  const { user } = props;

  // Calcluate sum of stocks in portfolio
  var portfolioSum;
  if (user.portfolioItems) {
    portfolioSum = user.portfolioItems.reduce((total, item) => {
      return item.stock.latestPrice * item.quantity + total;
    }, 0);
  } else {
    portfolioSum = 0;
  }

  // Conditionally render list of stocks or empty message
  var listOfStocks;
  if (user.portfolioItems.length === 0) {
    // Empty message
    listOfStocks = (
      <div className="empty-tag">You have no stocks in your portfolio...</div>
    );
  } else {
    // Stock list
    listOfStocks = (
      <ul className="stock-list">
        {user.portfolioItems &&
          user.portfolioItems.map(item => {
            let className;

            // Conditionally set class to reflect stock performance
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
        {/* List of stocks or empty message depending on length of portfolio */}
        {listOfStocks}
      </div>
      <Purchase setUser={props.setUser} user={user} />
    </div>
  );
};

export default Portfoilo;
