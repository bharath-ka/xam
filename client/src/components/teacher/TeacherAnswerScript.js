import React, { Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormInput,
  CardFooter,
  FormGroup,
  Button,
} from 'shards-react';
import './horizontal.scss';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import TeacherSubmitModal from './TeacherSubmitModal';
const TeacherAnswerScript = ({ history }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentAnswers = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        user: '5e38f7d24e845663f7f18114',
      });
      const res = await axios.post('/api/answers/list', body, config);
      setStudents(res.data);
      console.log(res.data);
    };
    fetchStudentAnswers();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(1);

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
  return currentStudents.length !== 0 ? (
    <Fragment>
      <Card style={{ backgroundColor: '#f9f7f7' }}>
        {currentStudents.length !== 0 &&
          currentStudents.map((student) => (
            <Fragment key={student._id}>
              <CardHeader>
                Rank :{' '}
                {student.question_id !== undefined && student.question_id.rank}{' '}
              </CardHeader>
              <CardBody>
                <CardTitle style={{ fontSize: '23px', fontWeight: 'normal' }}>
                  {student.question_id !== undefined &&
                    student.question_id.question}
                </CardTitle>
                <FormGroup>
                  <CardTitle>Answer :</CardTitle>
                  <Card>
                    <CardBody>{student.answer}</CardBody>
                  </Card>
                </FormGroup>
              </CardBody>
              <CardFooter style={{ fontSize: '23px' }}>
                <div className='cf'>
                  <div>
                    Prevevalution : <strong>2.5</strong>
                  </div>
                  <div className='ml-auto'>Evaluation :</div>
                  <div className='ml-2'>
                    <FormInput placeholder='Evaluate' />
                  </div>
                </div>
              </CardFooter>
            </Fragment>
          ))}
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
      <TeacherSubmitModal history={history} />
    </Fragment>
  ) : (
    <h3>No Test Takers</h3>
  );
};

export default TeacherAnswerScript;
