import * as actionTypes from '../actions/workflows/actionTypes';
import { defaultWorkflows } from '../../data/mockData'

const initialWorkflowsState = {
    workflows: [...defaultWorkflows]
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

        case actionTypes.UPDATE_WORKFLOW_STATE:
            const wfs = [...state.workflows];
            const wfToUpdateIndex = wfs.findIndex(wf => {
                return wf.id === action.wfId;
            });
            const wfToUpdate = wfs[wfToUpdateIndex]
            const oldState = wfToUpdate.state;

            const updatedWf = {...wfToUpdate, state: oldState === "Pending" ? "Completed" : "Pending"}
            wfs.splice(wfToUpdateIndex, 1, updatedWf);

            return {
                ...state, workflows: wfs
            };
        default:
            return state
    }
}