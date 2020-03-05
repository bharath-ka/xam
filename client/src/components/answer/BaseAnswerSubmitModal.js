import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from "react-bootstrap";
import { postBaseAnswers } from '../../actions/answers';

const BaseAnswerSubmitModal = ({ answers, test_id, base_id, history, module_ids }) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitAnswer = () => {
        const ansObj = {
            user_id: auth.user._id,
            qanswers: answers,
            test_id,
            base_id,
            history,
            module_ids
        };
        dispatch(postBaseAnswers(ansObj));
        setShow(false);
    }

    return (
        <Fragment>
            <Button variant="dark" onClick={handleShow}>
                Submit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure,you want to submit the answers?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                     </Button>
                    <Button onClick={handleSubmitAnswer} variant="warning">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default BaseAnswerSubmitModal;
