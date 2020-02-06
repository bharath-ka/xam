import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from "react-bootstrap";
import { postBaseAnswers } from '../actions/answers';
import PropTypes from 'prop-types'

const BaseAnswerSubmitModal = ({ answers, auth, postBaseAnswers, test_id, base_id, history, module_ids }) => {
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
        postBaseAnswers(ansObj);
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
BaseAnswerSubmitModal.propTypes = {
    postBaseAnswers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStatetoProps = (state) => ({
    auth: state.auth,
    answer: state.answer
})


export default connect(mapStatetoProps, { postBaseAnswers })(BaseAnswerSubmitModal);
