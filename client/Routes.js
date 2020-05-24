import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Portfoilo from './components/Portfolio';

const Routes = props => {
  const { user, setUser } = props;
  const isLoggedIn = user && user.id;
  return (
    <Switch>
      {!isLoggedIn && (
        <Route path="/login" render={() => <Login setUser={setUser} />} />
      )}
      {!isLoggedIn && (
        <Route path="/register" render={() => <Register setUser={setUser} />} />
      )}

      {isLoggedIn && (
        <Route path="/portfolio" render={() => <Portfoilo user={user} />} />
      )}
    </Switch>
  );
};

export default Routes;
