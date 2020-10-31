import * as actionTypes from './actionTypes';

export const toggleLogIn = (loggedIn) => {
    if(loggedIn) {
        return {
            type: actionTypes.LOG_OUT
        };
    }
    else {
        return {
            type: actionTypes.LOG_IN
        };
    }
    
};
