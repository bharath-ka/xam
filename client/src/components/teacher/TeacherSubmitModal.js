import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'shards-react';
// import { postAnswers } from '../../actions/answers';

const TeacherSubmitModal = ({ history }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  //   const handleSubmitAnswer = () => {
  //     const ansObj = {
  //       user_id: auth.user._id,
  //       qanswers: answers,
  //       test_id,
  //       module_ids,
  //       history,
  //       currentround: questionround.currentRound,
  //     };
  //     dispatch(postAnswers(ansObj));
  //     setOpen(false);
  //   };
  return (
    <Fragment>
      <Button style={{ marginTop: '10px' }} onClick={toggle}>
        Submit
      </Button>

      <Modal open={open} toggle={toggle}>
        <ModalHeader closeButton>Submit Evaluation</ModalHeader>
        <ModalBody>Are you sure,you want to submit the evaluation?</ModalBody>
        <ModalFooter>
          <Button theme='secondary' onClick={toggle}>
            Close
          </Button>
          <Button onClick={history.push('/teacher/students')}>Submit</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default TeacherSubmitModal;
