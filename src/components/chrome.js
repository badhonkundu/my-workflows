import { Route, Switch, Redirect } from "react-router-dom";

import Login from './login';
import Workflow from './workflow';
import Workflows from './workflows';
import NotFound from './notFound';


function Chrome(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/workflows" />} />
        <Route path="/login" component={Login} />
        <Route path="/workflows/:id" component={Workflow} />
        <Route path='/workflows' component={Workflows} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Chrome;
