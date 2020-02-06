import { POST_ANSWERS, POST_BASE_ANSWERS, ANSWERS_ERROR } from "../actions/types";

const initialState = {
    answer: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_ANSWERS:
        case POST_BASE_ANSWERS:
            return {
                ...state,
                answer: payload,
                loading: false
            }
        case ANSWERS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}