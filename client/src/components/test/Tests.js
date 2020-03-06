import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTests } from '../../actions/test';
import Spinner from '../layouts/Spinner';
import {
    Card,
    CardTitle,
    CardBody,
    Button,
    Col,
    Row,

} from "shards-react";

const Tests = () => {

    const { auth, test } = useSelector(state => ({
        auth: state.auth,
        test: state.test
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

    return loading ? <Spinner /> : <Fragment>
        <h2 className="text-center">Tests</h2>
        <Row>
            {
                tests.map((test) => (
                    <Col sm="12" lg="6" >
                        <Card style={{ marginBottom: "10px" }}>
                            <CardBody >
                                <CardTitle >{test.name}</CardTitle>
                                <Link to={{
                                    pathname: '/testsubjects',
                                    state: {
                                        test_id: test._id,
                                    }
                                }}>
                                    <Button className='text-center' variant='dark'>Go</Button>
                                </Link>
                                {/* <CardSubtitle className='gradient rounded'><span className="text-white">Card subtitle</span></CardSubtitle>
                            Nunc quis nisl ac justo elementum sagittis in quis justo.
                                        <div class="spinner-border spinner-border-lg" style={{ width: "5rem", height: "5rem" }} role="status">
                                <span class="sr-only">Loading...</span>
                            </div> */}
                            </CardBody>
                        </Card>
                    </Col>
                ))
            }
        </Row>
        {/* <Container style={{ marginTop: "26px" }}>
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
        </Container > */}
    </Fragment >;
}

export default Tests;
