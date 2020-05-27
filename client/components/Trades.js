import React from 'react';

const Trades = props => {
  console.log(props.user);
  return (
    <div id="trades">
      <h2>Trades</h2>
      {props.user.trades.map(trade => {
        return (
          <h5 key={trade.id}>
            {trade.stock.symbol} - {trade.numChange} @ {trade.askingPrice / 100}
          </h5>
        );
      })}
    </div>
  );
};

export default Trades;
