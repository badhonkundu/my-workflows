import * as React from 'react';

import { connect } from 'react-redux';

import { initializeIcons } from '@fluentui/react/lib/Icons';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import '../css/workflows.css';

import { deleteWf, updateWfState } from '../store/actions/workflows/actions';

initializeIcons();

const iconClass = mergeStyles({
  fontSize: 40,
  height: 40,
  width: 40,
  margin: '0px 5px',
  color: "white",
  borderRadius: '20px',
  cursor: 'pointer'
});

function WorkflowCard(props) {
  const toggleStateHandler = (e) => {
    e.preventDefault();
    let incompleteNodeIndex = -1;
    if (props.workflow.state === "Pending") {
      incompleteNodeIndex = props.workflow.nodes.findIndex(n => {
        return n.state !== "Completed";
      });
    }
    if (incompleteNodeIndex === -1) {
      props.onUpdateWfStatus(props.workflow.id)
    }
  }

  return (
    <div key={props.workflow.id} className="workflowCard" >
      <div className="workflowTitle" onClick = {() => props.history.push('/workflows/' + props.workflow.id)}> {props.workflow.name}</div>
      <div className="workflowStateSection">
        <div >{props.workflow.state}</div>
        
        <div>
          <FontIcon
            iconName="CheckMark"
            className={iconClass}
            style={{ backgroundColor: props.workflow.state === "Completed" ? "green" : "grey" }}
            onClick={toggleStateHandler} />
        </div>
      </div>
      <div className="deleteWF">
        <FontIcon iconName="Delete" onClick={() => props.onDeleteWF(props.workflow.id)} />
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteWF: (id) => { dispatch(deleteWf(id)) },
    onUpdateWfStatus: (id) => { dispatch(updateWfState(id)) }
  };
};

export default connect(null, mapDispatchToProps)(WorkflowCard);
