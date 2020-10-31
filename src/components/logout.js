import '../css/header.css'

import { DefaultButton } from 'office-ui-fabric-react';

function Header() {
  return (
    <DefaultButton text="Logout" onClick={() => console.log("logged out")} />
  );
}

export default Header;
