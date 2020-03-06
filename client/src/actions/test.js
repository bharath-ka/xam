import React from 'react';
import axios from 'axios';
import { setAlert, removeAlert } from './alert';
import { Button } from 'shards-react';

import {
    GET_TESTS,
    TEST_ERROR,
    GET_TEST_SUBJECTS,
    GET_BASE_TEST_QUESTIONS,
    BASE_QUESTION_ERROR
} from "./types";

export const getTests = (branch_id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ branch_id });
        const res = await axios.post('/api/tests/list', body, config);
        dispatch({
            type: GET_TESTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: TEST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const getTestSubjects = (test_id, branch_id, section_id, vcode) => async dispatch => {
    try {
        if (vcode)
            dispatch(setAlert({
                message: 'Test completed successfully',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'success',
                    action: key => (
                        <Button size="sm" theme="success" onClick={() => dispatch(removeAlert(key))}><i className="fa fa-close"></i></Button>
                    ),
                },
            }))
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ test_id, branch_id, section_id });
        const res = await axios.post('/api/tests/testsubjects/list', body, config);
        dispatch({
            type: GET_TEST_SUBJECTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: TEST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const getBaseTestQuestions = ({ test_id }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ test_id });
        const res = await axios.post('/api/tests/base/list', body, config);
        dispatch({
            type: GET_BASE_TEST_QUESTIONS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: BASE_QUESTION_ERROR,
            payload: { msg: error }
        })
    }
}

