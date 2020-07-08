import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Alert from '../layouts/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Tests from '../test/Tests';
import TestSubjects from '../test/TestSubjects';
import BaseTestQuestions from '../question/BaseTestQuestions';
import Questions from '../question/Questions';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layouts/NotFound';

import TeacherTest from '../teacher/TeacherTest';
import TeacherSubjects from '../teacher/TeacherSubjects';
import TeacherStudents from '../teacher/TeacherStudents';
import TeacherAnswerScript from '../teacher/TeacherAnswerScript';

const Routes = () => {
  return (
    <Container>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Register} />
        <Route exact path='/teacher/tests' component={TeacherTest} />
        <Route exact path='/teacher/subjects' component={TeacherSubjects} />
        <Route exact path='/teacher/students' component={TeacherStudents} />
        <Route
          exact
          path='/teacher/evaluation'
          component={TeacherAnswerScript}
        />
        <PrivateRoute exact path='/tests' component={Tests} />
        <PrivateRoute exact path='/testsubjects' component={TestSubjects} />
        <PrivateRoute exact path='/questions' component={Questions} />
        <PrivateRoute
          exact
          path='/basetestquestions'
          component={BaseTestQuestions}
        />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

export default Routes;
