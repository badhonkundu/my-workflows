import { connect } from 'react-redux';

import '../css/header.css';

import {toggleLogIn} from '../store/actions/login/actions';

import { DefaultButton } from 'office-ui-fabric-react';

function LoginButton(props) {
  return (
    <DefaultButton text={props.isLoggedIn ? "Logout" : "Login"} onClick={() => props.onLogInClick(props.isLoggedIn)} style ={{height: '30px'}} />
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: (loggedIn) => { dispatch(toggleLogIn(loggedIn)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
