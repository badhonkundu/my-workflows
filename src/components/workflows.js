import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

function Workflows(props) {
  const workflows = props.isLoggedIn
    ? <div> show workflows</div>
    : <Redirect to="/login" />
  return workflows;
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflows);
