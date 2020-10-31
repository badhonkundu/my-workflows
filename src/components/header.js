import '../css/header.css'

import { initializeIcons } from '@fluentui/react/lib/Icons';
import {FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import Logout from './logout';

initializeIcons();

const iconClass = mergeStyles({
  fontSize: 30,
  height: 30,
  width: 30,
  margin: '0px 5px',
  color: "white"
});

function Header(props) {
  return (
    <div className = "header">
        <FontIcon iconName="FunctionalManagerDashboard" className={iconClass} />
        <div className= "appName">FLOWAPP</div> 
        {props.loggedIn ? <Logout /> : null}
    </div>
  );
}

export default Header;
