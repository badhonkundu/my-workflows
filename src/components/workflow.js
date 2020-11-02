import * as React from 'react';
import { DefaultButton } from '@fluentui/react';
import { connect } from 'react-redux';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';


import '../css/workflows.css';
import NodeCard from './nodeCard'
import { updateWf, addWf } from '../store/actions/workflows/actions'
import { Redirect } from 'react-router-dom';

initializeIcons();
const iconClass = mergeStyles({
  fontSize: 40,
  height: 40,
  width: 40,
  margin: '0px 5px',
  color: "purple",
  borderRadius: '20px',
  cursor: 'pointer'
});


function Workflow(props) {
  let newWf = true;
  const isPersisted = localStorage.getItem("flowappLoginPersist");
  const currentPathSplitted = props.location.pathname.split('/');
  const wfId = +currentPathSplitted[currentPathSplitted.length - 1];
  const getWf = (id) => {
    return props.workflows.find(w => {
      return w.id === id;
    })
  };
  let wf = getWf(wfId);
  if (wfId === 0 || wf) {
    if (wfId !== 0) {
      newWf = false;
    }
  }
  else {
    props.history.push('/notfound')
  }

  const [wfName, setWfName] = React.useState(wf ? wf.name : '');
  const [nodes, setNodes] = React.useState(wf ? [...wf.nodes] : []);
  const [wfInvalid, setWfInvalid] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const childRef = React.useRef({});



  const addNodeHandler = () => {
    const newNodes = [...nodes];
    newNodes.push({
      id: (new Date()).getTime(),
      state: 'Pending',
      title: '',
      content: ''
    });
    setNodes(newNodes);
  }

  const shuffleNodes = () => {
    const newNodes = [...nodes]
    for (let i = newNodes.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [newNodes[i], newNodes[j]] = [newNodes[j], newNodes[i]];
    }
    setNodes(newNodes);
  }

  const updateNodeState = (id) => {
    const newNodes = [...nodes];
    const nodeToUpdateIndex = newNodes.findIndex(n => {
      return n.id === id;
    });
    const nodeToUpdate = newNodes[nodeToUpdateIndex];

    console.log(nodeToUpdateIndex, nodeToUpdate);
    const oldState = nodeToUpdate.state;

    let prevNodeState = nodeToUpdateIndex > 0 ? newNodes[nodeToUpdateIndex - 1].state : null;
    let nextNode = nodeToUpdateIndex !== newNodes.length - 1 ? newNodes[nodeToUpdateIndex + 1].state : null;

    if ((prevNodeState === "Completed" && nextNode === "Pending")
      || (nodeToUpdateIndex === 0 && nextNode === "Pending")
      || (nodeToUpdateIndex === newNodes.length - 1 && prevNodeState === "Completed")
      || newNodes.length === 1) {
      const updatedNode = { ...nodeToUpdate, state: oldState === "Pending" ? "In-Progress" : oldState === "In-Progress" ? "Completed" : "Pending" };
      newNodes.splice(nodeToUpdateIndex, 1, updatedNode);
      setNodes(newNodes);
    }
    console.log(newNodes);

  }

  const deleteNodeHandler = () => {
    const newNodes = [...nodes];
    newNodes.pop();
    setNodes(newNodes);
  }

  const allNodeItems = [...nodes].map((n, index) => {
    if (index === 0) {
      return (
        <NodeCard key={n.id} node={{ ...n }} updateNodeStateHandler={updateNodeState} ref={r => (childRef.current[index] = r)} />
      );
    }
    else {
      return (
        <React.Fragment>
          <div className="lineBtn">------&gt;</div>
          <NodeCard key={n.id} node={{ ...n }} updateNodeStateHandler={updateNodeState} ref={r => (childRef.current[index] = r)} />
        </React.Fragment>
      )

    }
  });

  const allNodes =
    <div className="allNodes">
      {allNodeItems}
    </div>

  const saveHandler = () => {
    if (wfName === '') {
      setWfInvalid(true);
      setErrorMsg('Please enter workflow name');
    }
    else if (nodes.length === 0) {
      setWfInvalid(true);
      setErrorMsg("Atleast one node is required");
    }
    else {
      const newNodes = []; //allNodeItems.map((item, index) => childRef.current[index].getLatestNodeData());
      for (let i = 0; i < allNodeItems.length; i++) {
        let nodeData = childRef.current[i].getLatestNodeData();
        if (nodeData.title !== '' && nodeData.content !== '') {
          newNodes.push(nodeData);
        }
        else {
          setWfInvalid(true);
          setErrorMsg("Nodes cannot have empty data");
          break;
        }
      }
      if (!wfInvalid) {
        if (wfId === 0) {
          props.onAddWf(
            {
              id: (new Date()).getTime(),
              name: wfName,
              nodes: newNodes,
              state: "Pending"
            }
          );
        }
        else {
          props.onUpdateWf(
            {
              id: wf.id,
              name: wfName,
              nodes: newNodes,
              state: wf.state
            }
          );
        }
      }
    }
  };


  const manageWf =
    <div className="manageWorkflows">
      <div className="controls flexer ">
        <TextField placeholder="Workflow Name" value={wfName} onChange={(e, newVal) => setWfName(newVal)} required />
      </div>
      {
        wf && wf.state === "Completed"
          ?
          <div className="controls"  >
            <DefaultButton text="Shuffle" iconProps={{ iconName: 'RepeatAll' }} className="manageButton violetBg" onClick={shuffleNodes} />
          </div>
          : null
      }

      <div className="controls">
        <DefaultButton text="Delete" iconProps={{ iconName: 'ChromeClose' }} className="manageButton redBg" onClick={deleteNodeHandler} />
      </div>
      <div className="controls">
        <DefaultButton text="Add Node" iconProps={{ iconName: 'Add' }} className="manageButton greenBg" onClick={addNodeHandler} />
      </div>
      <div className="controls">
        <PrimaryButton text="Save" onClick={saveHandler} className="manageButton" />
      </div>
    </div>

  return (
    props.isLoggedIn
      ?
      <React.Fragment>
        {manageWf}
        <PrimaryButton text="Go Back" iconProps={{ iconName: 'CaretLeftSolid8' }} className="manageButton" onClick={() => props.history.push('/workflows')} />
        {
          wfInvalid
            ? <div className="emptyFieldWarning"> {errorMsg} </div>
            : null
        }
        {allNodes}
      </React.Fragment>
      : <Redirect to = "/login" />
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    workflows: state.workflows.workflows
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWf: (wfData) => { dispatch(updateWf(wfData)) },
    onAddWf: (wfData) => { dispatch(addWf(wfData)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
