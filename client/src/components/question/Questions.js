import React, { useEffect, Fragment, useState } from 'react';
import { getNextQuestion } from "../../actions/question";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import Spinner from '../layouts/Spinner';
import AnswerSubmitModal from '../answer/AnswerSubmitModal';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    FormTextarea,
    FormGroup
} from "shards-react";

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
                <div className="display-5 lead text-center mb-3">Question : {questionRound !== null ? questionRound.currentRound : ''} of {questionRound !== null ? questionRound.totalRound : ''}</div>
                <Card key={nextQuestion._id} style={{ backgroundColor: "#f9f7f7" }}>
                    <CardHeader>Rank : {nextQuestion.rank}</CardHeader>
                    <CardBody>
                        <CardTitle>{nextQuestion.question}</CardTitle>
                        <FormGroup >
                            <label htmlFor="anskey"><span className="">Answer</span></label>
                            <FormTextarea
                                name={nextQuestion._id}
                                value={hookanswer[nextQuestion._id]}
                                rows="10"
                                onChange={e => handleChange(e)}
                            />
                        </FormGroup>
                    </CardBody>
                </Card>
                <AnswerSubmitModal answers={hookanswer} test_id={test_id} history={history} questionround={questionRound} module_ids={module_ids} />
            </Fragment>
        ) : <Spinner />
    )
}
export default Questions;
