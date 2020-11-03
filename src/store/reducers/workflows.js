import * as actionTypes from '../actions/workflows/actionTypes';
import { defaultWorkflows } from '../../data/mockData';

const initialWorkflowsState = {
    workflows: [],
    isGettingWfs: false,
    isSavingWf: false
}

export default function workflows(state = initialWorkflowsState, action) {
    switch (action.type) {
        case actionTypes.DELETE_WORKFLOW:
            const filteredWfs = state.workflows.filter(wf => {
                return wf.id !== action.wfId;
            });
            return {
                ...state, workflows: filteredWfs
            };

        case actionTypes.SET_SAVING_WORKFLOW:
            return {
                ...state, isSavingWf: action.isSavingWf
            };

        case actionTypes.UPDATE_WORKFLOW_STATE:
            const wfs = [...state.workflows];
            const wfToUpdateIndex = wfs.findIndex(wf => {
                return wf.id === action.wfId;
            });
            const wfToUpdate = wfs[wfToUpdateIndex]
            const oldState = wfToUpdate.state;

            const updatedWf = { ...wfToUpdate, state: oldState === "Pending" ? "Completed" : "Pending" }
            wfs.splice(wfToUpdateIndex, 1, updatedWf);

            return {
                ...state, workflows: wfs
            };
        case actionTypes.UPDATE_WORKFLOW:
            const newWfs = [...state.workflows];
            const wfToUpdateInd = newWfs.findIndex(wf => {
                return wf.id === action.wfData.id;
            });

            newWfs.splice(wfToUpdateInd, 1, action.wfData);

            return {
                ...state, workflows: newWfs
            };
        case actionTypes.ADD_WORKFLOW:
            const newWorkflows = [...state.workflows];
            newWorkflows.push(action.wfData);

            return {
                ...state, workflows: newWorkflows
            };

        case actionTypes.SET_WORKFLOWS:
            return {
                ...state, workflows: action.allWfs
            };
        case actionTypes.SET_GETTING_WORKFLOWS:
            return {
                ...state, isGettingWfs: action.isGettingWfs
            };
        default:
            return state
    }
}