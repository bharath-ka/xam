import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postBaseAnswers } from '../../actions/answers';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "shards-react";
const BaseAnswerSubmitModal = ({ answers, test_id, base_id, history, module_ids }) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }
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
        setOpen(false);
    }

    return (
        <Fragment>
            <Button style={{ marginTop: "10px" }} onClick={toggle}>
                Submit
            </Button>

            <Modal open={open} toggle={toggle}>
                <ModalHeader closeButton>
                    Submit Answer
                </ModalHeader>
                <ModalBody>Are you sure,you want to submit the answers?</ModalBody>
                <ModalFooter>
                    <Button theme="secondary" onClick={toggle}>
                        Close
                     </Button>
                    <Button onClick={handleSubmitAnswer} >
                        Submit
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default BaseAnswerSubmitModal;
