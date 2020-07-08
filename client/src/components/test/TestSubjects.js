import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTestSubjects } from '../../actions/test';
import Spinner from '../layouts/Spinner';
import { Card, CardTitle, CardBody, Button, Col, Row } from 'shards-react';
const TestSubjects = ({ location }) => {
  const test_id = location.state !== undefined ? location.state.test_id : '';
  const vcode = location.state !== undefined ? location.state.vcode : 0;
  const { auth, test } = useSelector((state) => ({
    auth: state.auth,
    test: state.test,
  }));
  const { isAuthenticated, user } = auth;
  const { testsubjects, loading } = test;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(
        getTestSubjects(test_id, user.branch_id, user.section_id, vcode)
      );
    }
    //eslint-disable-next-line
  }, [isAuthenticated, user, test_id]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        to={{
          pathname: '/tests',
        }}
      >
        <Button pill style={{ marginBottom: '10px' }} variant='dark'>
          Go Back
        </Button>
      </Link>
      <h3 className='text-center'>Test Subjects</h3>
      <Row>
        {testsubjects.map((tsub) => (
          <Col sm='6' lg='6'>
            <Card style={{ marginBottom: '10px' }}>
              <CardBody>
                <CardTitle>{tsub.subject.name}</CardTitle>
                {tsub.completed ? (
                  <Button className='text-center' theme='success'>
                    Completed
                  </Button>
                ) : (
                  <Link
                    to={{
                      pathname: '/basetestquestions',
                      state: {
                        test_id: test_id,
                        base_id: tsub.base_id,
                        module_ids: tsub.module_ids,
                      },
                    }}
                  >
                    <Button className='text-center' variant='dark'>
                      Go
                    </Button>
                  </Link>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};
export default TestSubjects;
