import React, { useEffect, Fragment, useState } from 'react';
import { getNextQuestion } from "../../actions/question";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import Spinner from '../layouts/Spinner';
import AnswerSubmitModal from '../answer/AnswerSubmitModal';
import { Card, Form } from 'react-bootstrap';

const Questions = ({ location, history }) => {
    const { auth, question } = useSelector(state => ({
        auth: state.auth,
        question: state.question
    }));
    const { isAuthenticated, user } = auth;
    const { loading, nextQuestion, answers, questionRound, completed } = question;
    const test_id = location.state !== undefined ? location.state.test_id : '';
    const module_ids = location.state !== undefined ? location.state.module_ids : '';
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(getNextQuestion(user._id, test_id));
        }
        //eslint-disable-next-line
    }, [isAuthenticated, user]);

    const [hookanswer, setHookanswer] = useState({});
    const handleChange = (e) => {
        answers[e.target.name] = e.target.value
        setHookanswer({ ...answers });
    }

    if (completed) {
        return <Redirect to={{
            pathname: '/testsubjects',
            state: {
                test_id: test_id,
                vcode: 1
            }
        }}
        />
    }
    return (
        !loading && nextQuestion !== null && nextQuestion._id !== undefined ? (
            <Fragment>
                <div className="display-5 lead text-center">Question : {questionRound !== null ? questionRound.currentRound : ''} of {questionRound !== null ? questionRound.totalRound : ''}</div>
                <Card bg="light" key={nextQuestion._id} >
                    <Card.Header>Rank : {nextQuestion.rank}</Card.Header>
                    <Card.Body>
                        <Card.Title>{nextQuestion.question}</Card.Title>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Answer Key</Form.Label>
                            <Form.Control name={nextQuestion._id} value={
                                hookanswer[nextQuestion._id]
                            } as="textarea" rows="3" onChange={e => handleChange(e)} />
                        </Form.Group>
                    </Card.Body>
                </Card>
                <AnswerSubmitModal answers={hookanswer} test_id={test_id} history={history} questionround={questionRound} module_ids={module_ids} />
            </Fragment>
        ) : <Spinner />
    )
}
export default Questions;
