import * as actionTypes from '../actions/workflows/actionTypes';

const initialWorkflowsState = {
    workflows: []
}

export default function workflows(state = initialWorkflowsState, action) {
    switch (action.type) {
        case "DUMMY":
            return {
                ...state, workflows: [...workflows, action.workflow]
            };        
        default:
            return state
    }
}