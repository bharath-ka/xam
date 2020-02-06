import axios from 'axios';
import { setAlert } from './alert';

import {
    POST_BASE_ANSWERS,
    ANSWERS_ERROR,
    GET_TEST_QUESTION
} from "./types";

export const postBaseAnswers = ({ user_id, qanswers, test_id, base_id, history, module_ids }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ user_id, qanswers, test_id, base_id, module_ids });
        const res = await axios.post('/api/answers/basequestion/evaluate', body, config);
        dispatch({
            type: POST_BASE_ANSWERS,
            payload: res.data
        });
        dispatch({
            type: GET_TEST_QUESTION,
            payload: res.data
        });
        dispatch(setAlert('Baseline Testing done successfully', 'success'))
        history.push({
            pathname: '/questions',
            state: {
                test_id: test_id,
                module_ids: module_ids
            }
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: ANSWERS_ERROR,
            payload: { msg: error }
        })
    }
}

export const postAnswers = ({ user_id, qanswers, test_id, module_ids, currentround, history }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ user_id, qanswers, test_id, questionRound: currentround, module_ids });
        const res = await axios.post('/api/answers/question/evaluate', body, config);
        // dispatch({
        //     type: POST_ANSWERS,
        //     payload: res.data
        // });
        dispatch(setAlert(`Question Round ${currentround} submitted successfully`, 'success'))
        dispatch({
            type: GET_TEST_QUESTION,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: ANSWERS_ERROR,
            payload: { msg: error }
        })
    }
}