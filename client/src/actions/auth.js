import React from 'react';
import axios from 'axios';
import { setAlert, removeAlert } from './alert';
import { Button } from 'shards-react';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';
//Load User

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}
//Register User

export const register = ({ name, email, password, role, section_id, branch_id }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, role, section_id, branch_id });

    try {
        const res = await axios.post('/api/users/add', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(
                {
                    message: error.msg,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error',
                        action: key => (
                            <Button size="sm" theme="danger" onClick={() => dispatch(removeAlert(key))}><i className="fa fa-close"></i></Button>
                        ),
                    },
                }
            )));
        }
        dispatch({
            type: REGISTER_FAIL
        })

    }
}

//Login User
export const login = ({ email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(
                {
                    message: error.msg,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error',
                        action: key => (
                            <Button size="sm" theme="danger" onClick={() => dispatch(removeAlert(key))}><i className="fa fa-close"></i></Button>
                        ),
                    },
                }
            )));
        }
        dispatch({
            type: LOGIN_FAIL
        })

    }

}

//Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}