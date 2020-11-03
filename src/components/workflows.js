import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import '../css/workflows.css';

import ManageWorkflows from './manageWorkflows';
import WorkflowCard from './workflowCard';
import { getWfsFromData } from '../store/actions/workflows/actions';

function Workflows(props) {
  const [filterOption, setFilterOption] = React.useState('All');
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {

    //Adding this check to ensure added/updated wf data is persisted as we do not have a backend server for this app
    //If there was a backend server, we could either fetch the whole workflows on every update or add
    //OR we could add the added/updated data to the existing workflows data on success of data post
    if (props.workflows.length === 0) {
      props.onGetWfs();
    }
  }, []);

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
      <WorkflowCard key={w.id} workflow={w} history={props.history} />
    )
  });

  const workflows = props.isLoggedIn
    ?
    <React.Fragment >
      <ManageWorkflows setFilter={setFilterOption} setSearchText={setSearchText} history={props.history} />
      {
        props.isGettingWfs
          ?
          <Spinner size={SpinnerSize.large} style={{ marginTop: '30px' }} />
          :
          <div className="allWorkflows">
            {allWorkflows}
          </div>
      }

    </React.Fragment>
    : <Redirect to="/login" />
  return workflows;
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    workflows: state.workflows.workflows,
    isGettingWfs: state.workflows.isGettingWfs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetWfs: () => { dispatch(getWfsFromData()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflows);
