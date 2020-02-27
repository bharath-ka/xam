import React, { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTests } from '../../actions/test';
import Spinner from '../layouts/Spinner';
import { Button, Card, Row, CardGroup } from 'react-bootstrap';

const Tests = () => {

    const { auth, test } = useSelector(state => ({
        auth: state.auth,
        test: state.test
    }));

    const { isAuthenticated, user } = auth;
    const { tests, loading } = test;
    const dispatch = useDispatch();
    useEffect(() => {
        isAuthenticated &&
            user &&
            dispatch(getTests(user.branch_id));
    }, [isAuthenticated, user]);

    return loading && tests === null ? <Spinner /> : <Fragment>
        <Container style={{ marginTop: "26px" }}>
            <Row>
                {tests.map(test => (
                    <CardGroup className='text-center' key={test._id}>
                        <Card border='dark'>
                            <Card.Header> {test.name}</Card.Header>
                            <Card.Body className="border-dark mb-3" style={{ marginTop: "5px", marginLeft: "5px", width: "13rem" }}>

                                <Link to={{
                                    pathname: '/testsubjects',
                                    state: {
                                        test_id: test._id,
                                    }
                                }}>
                                    <Button className='text-center' variant='dark'>Go</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                ))
                }
            </Row>
        </Container >
    </Fragment >;
}

export default Tests;
