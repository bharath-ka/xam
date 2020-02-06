import axios from 'axios';

import {
    GET_SUBJECTS,
    SUBJECT_ERROR
} from "./types";

export const getSubjects = () => async dispatch => {
    try {
        const res = await axios.get('/api/subjects/list');
        dispatch({
            type: GET_SUBJECTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SUBJECT_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}