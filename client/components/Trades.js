import React from 'react';

import './trades.scss';

const Trades = props => {
  var list;
  if (props.user.trades.length === 0) {
    list = <div className="empty-tag">You have not made any trades yet...</div>;
  } else {
    list = (
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
    );
  }

  return (
    <div id="trades">
      <div className="header">
        <span className="title">Trades</span>
      </div>
      {list}
    </div>
  );
};

export default Trades;
