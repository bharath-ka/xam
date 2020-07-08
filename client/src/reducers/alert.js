import {
    SET_ALERT,
    CLOSE_ALERT,
    REMOVE_ALERT
} from "../actions/types";

const initialState = {
    notifications: [],
};

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };
        case CLOSE_ALERT:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
        case REMOVE_ALERT:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            }
        default:
            return state;
    }
}