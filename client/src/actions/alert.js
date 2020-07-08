import {
    SET_ALERT,
    CLOSE_ALERT,
    REMOVE_ALERT
} from './types';

export const setAlert = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: SET_ALERT,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const removeAlert = key => ({
    type: REMOVE_ALERT,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const closeAlert = key => ({
    type: CLOSE_ALERT,
    key,
});