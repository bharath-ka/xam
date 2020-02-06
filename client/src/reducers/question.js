import { GET_BASE_TEST_QUESTIONS, BASE_QUESTION_ERROR, QUESTION_RANK, GET_TEST_QUESTION, QUESTION_ERROR } from "../actions/types";

const initialState = {
    baseTestQuestions: [],
    nextQuestion: {},
    rank: null,
    questionRound: null,
    answers: {},
    completed: false,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_BASE_TEST_QUESTIONS:
            const obj = {};
            payload.forEach(pl => obj[pl._id] = '');
            return {
                ...state,
                baseTestQuestions: payload,
                answers: obj,
                loading: false
            }
        case GET_TEST_QUESTION:
            const qobj = {};
            const q_id = payload.nextQuestion._id || 'bleh'
            qobj[q_id] = '';
            return {
                ...state,
                loading: false,
                answers: qobj,
                nextQuestion: payload.nextQuestion,
                questionRound: payload.questionround,
                completed: payload.completed
            }
        case QUESTION_RANK:
            return {
                ...state,
                rank: payload[0].rank
            }
        case BASE_QUESTION_ERROR:
        case QUESTION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}