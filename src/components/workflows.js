import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import '../css/workflows.css';

import ManageWorkflows from './manageWorkflows';
import WorkflowCard from './workflowCard';

function Workflows(props) {
  const [filterOption, setFilterOption] = React.useState('All');
  const [searchText, setSearchText] = React.useState('');

  const filteredWFs = props.workflows.filter(w => {
    if (filterOption === "All" && w.name.toLowerCase().indexOf(searchText) > -1) {
      return true;
    }
    else {
      return w.state === filterOption && w.name.toLowerCase().indexOf(searchText) > -1;
    }
  });
  const allWorkflows = filteredWFs.map(w => {
    return (
      <WorkflowCard key={w.id} workflow={w} history = {props.history} />
    )
  });

  const workflows = props.isLoggedIn
    ?
    <React.Fragment >
      <ManageWorkflows setFilter={setFilterOption} setSearchText = {setSearchText} history = {props.history} />
      <div className="allWorkflows">
        {allWorkflows}
      </div>
    </React.Fragment>
    : <Redirect to="/login" />
  return workflows;
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    workflows: state.workflows.workflows
  };
};

export default connect(mapStateToProps)(Workflows);
