import * as React from 'react';
import { connect } from 'react-redux';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { PrimaryButton } from 'office-ui-fabric-react';

import { logIn } from '../store/actions/login/actions';

import '../css/login.css';

const iconProps = { iconName: 'Mail' };

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRememberMe, setRememberMe] = React.useState(true);

  const onEmailChange = React.useCallback(
    (event, newValue) => {
      setEmail(newValue || '');
    },
    [],
  );

  const onPasswordChange = React.useCallback(
    (event, newValue) => {
      setPassword(newValue || '');
    },
    [],
  );

  const onChechedChange = React.useCallback((ev, checked) => {
    setRememberMe(!!checked);
  }, []);

  const onLoginClick = React.useCallback(() => {
    console.log(email, "-", password, "-");
    if(email !== '' && password !== '') {
      props.login();
      props.history.replace('/workflows');
    }
    else {
      alert("enter valid details");
    }
  }, [email, password]);

  return (
    <div className="loginWidget">
      <Label>Login</Label>
      <div className="widgetChild">
        <TextField placeholder="Email" required iconProps={iconProps} value={email} onChange={onEmailChange} />
      </div>
      <div className="widgetChild">
        <TextField placeholder="Password" required type="password" canRevealPassword value={password} onChange={onPasswordChange} />
      </div>
      <div className="widgetChild">
        <Checkbox label="Remember me" checked={isRememberMe} onChange={onChechedChange} />
      </div>
      <div className="widgetChild">
        <PrimaryButton text="Login" onClick={onLoginClick} style={{ height: '30px' }} />
      </div>
      <div className="widgetChild">
        <label className="dummySignup">Don't have an account? Sign up here</label>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => { dispatch(logIn()); },
  };
};

export default connect(null, mapDispatchToProps)(Login);
