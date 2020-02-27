import React, { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTestSubjects } from '../../actions/test';
import Spinner from '../layouts/Spinner';
import { Button, Card, Row, CardGroup } from 'react-bootstrap';

const TestSubjects = ({ location }) => {
    const test_id = location.state !== undefined ? location.state.test_id : '';
    const vcode = location.state !== undefined ? location.state.vcode : 0;
    const { auth, test } = useSelector(state => ({
        auth: state.auth,
        test: state.test
    }));
    const { isAuthenticated, user } = auth;
    const { testsubjects, loading } = test;
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(getTestSubjects(test_id, user.branch_id, user.section_id, vcode));
        }
        //eslint-disable-next-line
    }, [isAuthenticated, user, test_id]);
    return loading && testsubjects !== null ? <Spinner /> : <Fragment>
        <Link to={{
            pathname: '/tests',
        }}
        >
            <Button style={{ marginTop: "10px" }} variant='dark'>Go Back</Button>
        </Link>
        <Container style={{ marginTop: "26px" }}>

            <Row>
                {testsubjects.map(tsub => (
                    <CardGroup className='text-center' key={tsub._id}>
                        <Card border='dark'>
                            <Card.Header> {tsub.subject.name}</Card.Header>
                            <Card.Body className="border-dark mb-3" style={{ marginTop: "5px", marginLeft: "5px", width: "13rem" }}>
                                {tsub.completed
                                    ? (<Button className='text-center' variant='dark'>Completed</Button>)
                                    : (<Link to={{
                                        pathname: '/basetestquestions',
                                        state: {
                                            test_id: test_id,
                                            base_id: tsub.base_id,
                                            module_ids: tsub.module_ids
                                        }
                                    }}
                                    >
                                        <Button className='text-center' variant='dark'>Go</Button>
                                    </Link>)
                                }

                            </Card.Body>
                        </Card>
                    </CardGroup>
                ))
                }
            </Row>
        </Container >
    </Fragment >;
}
export default TestSubjects;
