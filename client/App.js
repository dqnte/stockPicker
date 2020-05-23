import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import Root from './components/Root';
import History from './History';

ReactDOM.render(
  <Router history={History}>
    <Root />
  </Router>,
  document.getElementById('app')
);
