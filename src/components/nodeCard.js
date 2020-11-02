import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { initializeIcons } from '@fluentui/react/lib/Icons';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

import '../css/workflows.css';

initializeIcons();

const NodeCard = React.forwardRef((props, ref) =>  {
  const [nodeTitle, setNodeTitle] = React.useState(props.node.title);
  const [nodeContent, setNodeContent] = React.useState(props.node.content);
  const [nodeState, setNodeState] = React.useState(props.node.state);
  console.log("NodeDisplayed", props.node.id, props.node.state, props.node);
  React.useImperativeHandle(ref, () => ({
    getLatestNodeData: () => {
      return ({
        id: props.node.id,
        title: nodeTitle,
        content: nodeContent,
        state: nodeState
      })
    }
  }));

  const wfNode =
    <div className="workflowCard" ref={ref}>
      <div className="cardChildren">
        <TextField placeholder="Title" value={nodeTitle} onChange={(e, newVal) => setNodeTitle(newVal)} required />
      </div>
      <div className="cardChildren">
        <TextField placeholder="Content" multiline value={nodeContent} onChange={(e, newVal) => setNodeContent(newVal)} required />
      </div>
      {
        nodeTitle === '' || nodeContent === ''
        ? <div className="cardChildren"><label className = "emptyFieldWarning">All fields are mandatory</label></div>
        : null
      }
      <div className="updateNodeState" style={{backgroundColor: props.node.state === "Completed" ? "green" : props.node.state === "In-Progress" ? "blue" : "grey"}}>
        <FontIcon iconName="CheckMark" onClick={() => {props.updateNodeStateHandler(props.node.id)}}  />
      </div>
    </div>

  return wfNode;
});

export default NodeCard;
