import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from "react-bootstrap";
import { postAnswers } from '../../actions/answers';
import PropTypes from 'prop-types'

const AnswerSubmitModal = ({ answers, auth, postAnswers, test_id, module_ids, history, questionround }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitAnswer = () => {
        const ansObj = {
            user_id: auth.user._id,
            qanswers: answers,
            test_id,
            module_ids,
            history,
            currentround: questionround.currentRound
        };
        postAnswers(ansObj);
        setShow(false);
    }
    return (
        <Fragment>
            <Button style={{ marginTop: "10px" }} variant="dark" onClick={handleShow}>
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
AnswerSubmitModal.propTypes = {
    postAnswers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStatetoProps = (state) => ({
    auth: state.auth,
    answer: state.answer
})


export default connect(mapStatetoProps, { postAnswers })(AnswerSubmitModal);
