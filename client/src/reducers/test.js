import { GET_TESTS, TEST_ERROR, GET_TEST_SUBJECTS } from "../actions/types";

const initialState = {
    tests: [],
    loading: true,
    testsubjects: [],
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TESTS:
            return {
                ...state,
                tests: payload,
                loading: false
            }
        case GET_TEST_SUBJECTS:
            return {
                ...state,
                testsubjects: payload,
                loading: false
            }
        case TEST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}