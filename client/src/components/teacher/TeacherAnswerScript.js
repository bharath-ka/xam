import React, { Fragment, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormInput,
  CardFooter,
  FormGroup,
} from 'shards-react';
import './horizontal.scss';
import { Pagination } from 'react-bootstrap';

const TeacherAnswerScript = () => {
  const [students] = useState([
    {
      name: 'Ho',
    },
    {
      name: 'Ho',
    },

    {
      name: 'Ho',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(4);

  //Get current posts
  const indexOfLastQuestion = currentPage * studentsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Fragment>
      <Card style={{ backgroundColor: '#f9f7f7' }}>
        <CardHeader>Rank : Medium</CardHeader>
        <CardBody>
          <CardTitle style={{ fontSize: '23px', fontWeight: 'normal' }}>
            Explain the steps in modelling and the method of establishing sound
            controlling
          </CardTitle>
          <FormGroup>
            <CardTitle>Answer :</CardTitle>
            <Card>
              <CardBody>
                <div style={{ maxHeight:'300px', overflow: 'scroll' }}>
                  Steps in controlling mainly involves 4 major steps <br />
                  1. Establishment of standards / Setting Standards /
                  Identifying the standards and objectives Standards are from
                  the boundary line for the controlling. We need to form the
                  standards depending on the internet of company and then we
                  need to develop the product satisfying. These standards are
                  like a model depending on which implementation and
                  developments takes place. While creating a project it is
                  important to set up the standards of the project.
                  <br />
                  The standards are precise and quantitative method. While
                  measuring standards, they are referred or determined as the
                  referential line or the base for the standard. While
                  establishing standards they have be in terms of “cost has to
                  be reduced” and “rejection has to be reduced” rather than
                  specifying “cost has to reduced by 10%” and “rejection has to
                  be reduced by 0.5%”. The standards are considered as the
                  benchmark while used in measuring the performance.
                  <br />
                  This also include some of standards. Standards are, by
                  definition, simply the criteria of performance. They are the
                  selected points in an entire planning program at which
                  performance is measured so that managers can receive signals
                  about how things are going and thus do not have to watch every
                  step in the execution of plans. Standard elements form
                  precisely worded, measurable objectives and are especially
                  important for control.
                  <br />
                  In an industrial enterprise, standards could include sales and
                  production targets, work attendance goals, safety records,
                  etc.
                </div>
              </CardBody>
            </Card>
          </FormGroup>
        </CardBody>
        <CardFooter style={{ fontSize: '23px' }}>
          <div className='cf'>
            <div>
              Prevevaluted : <strong>2.6</strong>
            </div>
            <div className='ml-auto'>Evaluation :</div>
            <div className='ml-2'>
              <FormInput placeholder='Evaluate' />
            </div>
          </div>
        </CardFooter>
      </Card>
      <Pagination className='d-flex justify-content-center'>
        <Pagination.First onClick={() => setCurrentPage(pageNumbers[0])} />
        <Pagination.Prev
          onClick={() => {
            let prev;
            currentPage > 1
              ? (prev = currentPage - 1)
              : (prev = pageNumbers[0]);
            setCurrentPage(prev);
          }}
        />
        {pageNumbers.map((num) => (
          <Pagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => {
            let next;
            currentPage < pageNumbers.length
              ? (next = currentPage + 1)
              : (next = pageNumbers[pageNumbers.length - 1]);
            setCurrentPage(next);
          }}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])}
        />
      </Pagination>
    </Fragment>
  );
};

export default TeacherAnswerScript;
