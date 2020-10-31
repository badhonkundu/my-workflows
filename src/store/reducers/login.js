import * as actionTypes from '../actions/login/actionTypes';

const initialLoginState = {
    isLoggedIn: false
}

export default function login(state = initialLoginState, action) {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state, isLoggedIn: true
            };
        case actionTypes.LOG_OUT:
            return {
                ...state, isLoggedIn: false
            };
        default:
            return state
    }
}