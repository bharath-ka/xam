import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormTextarea,
  FormGroup,
} from 'shards-react';
import { Pagination } from 'react-bootstrap';
const TeacherStudents = ({ history }) => {
  const [students] = useState([
    {
      usn: '1AY16IS002',
      name: 'Ashwin Prasad A',
      actualevaluation: '12',
      preevaluation: '13',
      evaluation: false,
    },
    {
      usn: '1AY16IS003',
      name: 'Anshula Ranjit',
      preevaluation: '14',
      actualevaluation: '15',
      evaluation: false,
    },
    {
      usn: '1AY16IS001',
      name: 'Bharath Karanth A',
      actualevaluation: '',
      preevaluation: '12.5',
      evaluation: false,
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
  console.log(history);
  return (
    <div>
      <h1>Test Students : ME</h1>
      <Card>
        <CardBody>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>USN</th>
                <th scope='col'>Name</th>
                <th scope='col'>Prevaluated Results</th>
                <th scope='col'>Actual Evaluation</th>
                <th scope='col'>Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr>
                  <th scope='row'>1</th>
                  <td>
                    <div style={{ fontSize: '20px' }}>{student.name}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '25px' }}>
                      {student.preevaluation}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '25px' }}>
                      {student.actualevaluation}
                    </div>
                  </td>
                  <td>
                    {student.actualevaluation ? (
                      <button className='btn btn-success'>Completed</button>
                    ) : (
                      <button
                        onClick={() => history.push('/teacher/evaluation')}
                        className='btn btn-warning'
                      >
                        Needed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentStudents.map((student) => (
            <div className='student-list'>
              <div className='ml-3'></div>
            </div>
          ))}
        </CardBody>
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
      {/* <ul onClick={() => history.push('/teacher/evaluation')}>
        <l1>
          Bharath Karanth A <span>Graded : 15</span>Evaluation needed
        </l1>
        <l1>
          Ashwin Prasad A <span>Graded : 15</span>Evaluation needed
        </l1>
      </ul> */}
    </div>
  );
};

export default TeacherStudents;
