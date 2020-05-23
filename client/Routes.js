import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

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

      {isLoggedIn && <Route path="/home" render={() => <Home user={user} />} />}
    </Switch>
  );
};

export default Routes;
