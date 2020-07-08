import axios from 'axios';
// import { setAlert } from './alert';
import {
    GET_BASE_TEST_QUESTIONS,
    GET_TEST_QUESTION,
    QUESTION_ERROR,
    BASE_QUESTION_ERROR
} from "./types";

export const getBaseTestQuestions = (base_id, user_id, history, module_ids, test_id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ base_id, user_id, test_id });
        const res = await axios.post('/api/answers/basetestcompletion/list', body, config);
        const submitted = res.data !== null ? res.data.submitted : false;
        if (submitted) {
            history.push({
                pathname: '/questions',
                state: {
                    module_ids: module_ids,
                    test_id: test_id
                }
            })
        }
        else {
            const res = await axios.post('/api/questions/baseQuestions/list', body, config);
            dispatch({
                type: GET_BASE_TEST_QUESTIONS,
                payload: res.data
            })
        }

    } catch (error) {
        console.error(error);
        dispatch({
            type: BASE_QUESTION_ERROR,
            payload: { msg: error }
        })
    }
}

export const getNextQuestion = (user_id, test_id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ user_id, test_id });
        
        const res = await axios.post('/api/questions/nextQuestion', body, config);
        dispatch({
            type: GET_TEST_QUESTION,
            payload: res.data
        })

    } catch (error) {
        console.error(error);
        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: error }
        })
    }
}
