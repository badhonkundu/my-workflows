import * as actionTypes from './actionTypes';

export const deleteWf = (id) => {
    return {
        type: actionTypes.DELETE_WORKFLOW,
        wfId: id
    };    
};

export const updateWfState = (wfId) => {
    return {
        type: actionTypes.UPDATE_WORKFLOW_STATE,
        wfId: wfId
    };    
};

export const updateWf = (wf) => {
    return {
        type: actionTypes.UPDATE_WORKFLOW,
        wfData: wf
    };    
};

export const addWf = (wf) => {
    return {
        type: actionTypes.ADD_WORKFLOW,
        wfData: wf
    };    
};
