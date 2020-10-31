import { Route, Switch, Redirect } from "react-router-dom";

import Login from './login';
import Workflow from './workflow';
import Workflows from './workflows';
import NotFound from './notFound';


function Chrome(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Workflows} />
        <Route path="/login" component={Login} />
        <Route path="/:id" render={Workflow} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Chrome;
