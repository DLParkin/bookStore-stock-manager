import React, { Component, Fragment } from "react";
import MainPage from "./components/MainPage";
import { Container } from "reactstrap";
import AddAuto from "./components/Add/AddAuto";
import AddManual from "./components/Add/AddManual";
import "./scss/app.scss";
import { Route, Switch, Router } from "react-router-dom";
import history from "../history";
import RemoveAuto from "./components/Remove/RemoveAuto";
import Find from "./components/Other/Find";
import Stats from "./components/Other/Stats";
import RequestPage from "./components/Requests/RequestPage"
import ReportPage from "./components/Reports/ReportPage";

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      name: null
    };
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={MainPage} />
            </Switch>
            <Switch>
              <Route path="/AddAuto" component={AddAuto} />
            </Switch>
            <Switch>
              <Route path="/AddManual" component={AddManual} />
            </Switch>
            <Switch>
              <Route path="/RemoveAuto" component={RemoveAuto} />
            </Switch>
            <Switch>
              <Route path="/Find" component={Find} />
            </Switch>
            <Switch>
              <Route path="/Stats" component={Stats} />
            </Switch>
            <Switch>
              <Route path="/RequestPage" component={RequestPage} />
            </Switch>
            <Switch>
              <Route path="/ReportPage" component={ReportPage} />
            </Switch>
          </Router>
        </Container>
      </Fragment>
    );
  }
}

export interface IAppProps {}

export interface IAppState {}

export default App;
