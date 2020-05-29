import React from 'react';

import './trades.scss';

const Trades = props => {
  return (
    <div id="trades">
      <div className="header">
        <span className="title">Trades</span>
      </div>
      <ul className="trade-list">
        {props.user.trades.map(trade => {
          return (
            <li key={trade.id} className="trade-item">
              ({trade.type.toUpperCase()}) {trade.stock.symbol} -{' '}
              {trade.numChange} @{' '}
              <span>{(trade.askingPrice / 100).toFixed(2)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Trades;
