import * as actionTypes from './actionTypes';

export const logOut = () => {
    return {
        type: actionTypes.LOG_OUT
    };    
};

export const logIn = () => {
    return {
        type: actionTypes.LOG_IN
    };    
};
