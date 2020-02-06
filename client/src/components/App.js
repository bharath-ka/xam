import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Alert from './Alert';
import { Provider } from 'react-redux';
import store from '../store';
import { Container } from 'react-bootstrap';
import BaseTestQuestions from './BaseTestQuestions';
import Tests from "./Tests";
import TestSubjects from "./TestSubjects";
import Questions from "./Questions";
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';
import setAuthToken from '../utils/setAuthToken';
import Test from './Test';
import { loadUser } from '../actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Container>
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/test" component={Test} />
              <PrivateRoute exact path="/tests" component={Tests} />
              <PrivateRoute exact path="/testsubjects" component={TestSubjects} />
              <PrivateRoute exact path="/questions" component={Questions} />
              <PrivateRoute exact path="/basetestquestions" component={BaseTestQuestions} />
            </Switch>
          </Container>


        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
