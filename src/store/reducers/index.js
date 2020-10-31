import { combineReducers } from 'redux';
import login from './login';
import workflows from './/workflows';

export default combineReducers({
    login,
    workflows
});