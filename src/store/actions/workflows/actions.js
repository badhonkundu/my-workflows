import * as actionTypes from './actionTypes';
import { getWfs } from '../../../data/data';

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

export const setSavingWf = (isSavingWf) => {
    return {
        type: actionTypes.SET_SAVING_WORKFLOW,
        isSavingWf: isSavingWf
    };
};

const updateWfDispatcher = (wf) => {
    return ({
        type: actionTypes.UPDATE_WORKFLOW,
        wfData: wf
    })
};

const addWfDispatcher = (wf) => {
    return ({
        type: actionTypes.ADD_WORKFLOW,
        wfData: wf
    })
};

export const updateWf = (wf) => {
    return dispatch => {
        dispatch(setSavingWf(true));
        setTimeout(() => {
            dispatch(updateWfDispatcher(wf));
            dispatch(setSavingWf(false));
        }, 1000);
    };
};

export const addWf = (wf, redirectHandler) => {
    return dispatch => {
        dispatch(setSavingWf(true));
        setTimeout(() => {
            dispatch(addWfDispatcher(wf));
            redirectHandler(wf.id);
            dispatch(setSavingWf(false));
        }, 1000);
    }
};

export const setWfs = (allWfs) => {
    return {
        type: actionTypes.SET_WORKFLOWS,
        allWfs: allWfs
    };
};

export const setGettingWfs = (isGettingWfs) => {
    return {
        type: actionTypes.SET_GETTING_WORKFLOWS,
        isGettingWfs: isGettingWfs
    };
};

export const getWfsFromData = () => {

    return dispatch => {
        dispatch(setGettingWfs(true));
        getWfs()
            .then(wfs => {
                dispatch(setWfs(wfs));
                dispatch(setGettingWfs(false));
            })
            .catch(e => {
                dispatch(setGettingWfs(false));
            })
    }

}
