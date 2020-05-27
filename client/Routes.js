import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const Routes = props => {
  const { user, setUser } = props;
  const isLoggedIn = user && user.id;

  const unAuthedRoutes = (
    <React.Fragment>
      <Route key={1} path="/login" render={() => <Login setUser={setUser} />} />
      <Route
        key={2}
        path="/register"
        render={() => <Register setUser={setUser} />}
      />
      <Route key={3} path="/" render={() => <Login setUser={setUser} />} />
    </React.Fragment>
  );

  return (
    <Switch>
      {!isLoggedIn && unAuthedRoutes}
      {isLoggedIn && (
        <Route key={4} render={() => <Home user={user} setUser={setUser} />} />
      )}
    </Switch>
  );
};

export default Routes;
