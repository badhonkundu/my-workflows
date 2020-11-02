import { connect } from 'react-redux';

import '../css/header.css';

import { logOut } from '../store/actions/login/actions';

import { DefaultButton } from 'office-ui-fabric-react';

function Logout(props) {
  const logoutHandler = () => {
    localStorage.removeItem("flowappLoginPersist");
    props.onLogOutClick();
  }

  const logOut = props.isLoggedIn
    ? <DefaultButton text="Logout" onClick={logoutHandler} style={{ height: '30px' }} />
    : null;

  return logOut;
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOutClick: () => { dispatch(logOut()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
