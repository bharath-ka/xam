import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Routes from './components/routing/Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={6}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
