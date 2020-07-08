import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardBody, Button, Col, Row } from 'shards-react';
import Spinner from '../layouts/Spinner';

const TeacherSubjects = () => {
  const [testsubjects] = useState([
    {
      _id: 1,
      name: 'Management and Entreprenuer',
    },
    {
      _id: 2,
      name: 'Computer Networks',
    },
  ]);

  //   useEffect(() => {
  //     const fetchTestsubjects = async () => {
  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       };
  //       const body = JSON.stringify({ branch_id: '5e38f67588673563d60c5f38' });
  //       const res = await axios.post('/api/tests/list', body, config);
  //       console.log(res.data);
  //       setTestsubjects(res.data);
  //     };
  //     fetchTestsubjects();
  //   }, []);
  return testsubjects.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className='text-center'>Subjects</h2>
      <Row>
        {testsubjects.map((test) => (
          <Col key={test._id} sm='12' lg='6'>
            <Card style={{ marginBottom: '10px' }}>
              <CardBody>
                <CardTitle>{test.name}</CardTitle>
                <Link
                  to={{
                    pathname: '/teacher/tests',
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

export default TeacherSubjects;
