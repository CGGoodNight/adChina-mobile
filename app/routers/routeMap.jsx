import React, { Component } from "react";
import { Route,IndexRoute, hashHistory, Router } from "react-router";

import Main from "../containers/Main";
import Login from "../containers/Login";
import Detail from  "../containers/Detail";
import My from "../containers/My";
import Ad from "../containers/Ad";
import Demand from "../containers/Demand";

class RouteMap extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRoute component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/detail/:page/:id" component={Detail} />
          <Route path="/my" component={My} />
          <Route path="/ad" component={Ad} />
          <Route path="/demand" component={Demand} />
        </Route>
      </Router>
    );
  }
}

export default RouteMap;
