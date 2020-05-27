import React, { useState } from 'react';

import Portolio from './Portfolio';
import Trades from './Trades';

const Home = props => {
  const [view, setView] = useState(0);

  return (
    <React.Fragment>
      <button type="button" onClick={() => setView(0)}>
        Portfolio
      </button>
      <button type="button" onClick={() => setView(1)}>
        Trades
      </button>
      {view === 0 && <Portolio user={props.user} setUser={props.setUser} />}
      {view === 1 && <Trades user={props.user} />}
    </React.Fragment>
  );
};

export default Home;
