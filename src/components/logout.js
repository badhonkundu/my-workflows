import '../css/header.css'

import { DefaultButton } from 'office-ui-fabric-react';

function Logout() {
  return (
    <DefaultButton text="Logout" onClick={() => console.log("logged out")} style ={{height: '30px'}} />
  );
}

export default Logout;
