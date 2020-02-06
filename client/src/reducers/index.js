import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import subject from './subject';
import question from "./question";
import test from "./test";
import answers from './answers';


export default combineReducers({
    alert,
    auth,
    subject,
    question,
    test,
    answers
});