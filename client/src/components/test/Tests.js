import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTests } from '../../actions/test';
import Spinner from '../layouts/Spinner';
import { Card, CardTitle, CardBody, Button, Col, Row } from 'shards-react';

const Tests = () => {
  const { auth, test } = useSelector((state) => ({
    auth: state.auth,
    test: state.test,
  }));

  const { isAuthenticated, user } = auth;
  const { tests, loading } = test;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(getTests(user.branch_id));
    }
    //eslint-disable-next-line
  }, [isAuthenticated, user]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className='text-center'>Tests</h2>
      <Row>
        {tests
          .filter((tests, i) => i === 0)
          .map((test) => (
            <Col key={test._id} sm='12' lg='6'>
              <Card style={{ marginBottom: '10px' }}>
                <CardBody>
                  <CardTitle>{test.name}</CardTitle>
                  <Link
                    to={{
                      pathname: '/testsubjects',
                      state: {
                        test_id: test._id,
                      },
                    }}
                  >
                    <Button className='text-center' variant='dark'>
                      Go
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </Fragment>
  );
};

export default Tests;
