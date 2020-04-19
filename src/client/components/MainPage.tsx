import React, { Component, Fragment } from "react";
import { Jumbotron } from "reactstrap";
import NavigationBar from "./NavigationBar";

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <NavigationBar />
        <Jumbotron>
          <h1 className="display-3">Guildford Book Store App</h1>
          <p className="lead">
            A bit of an upgrade to use some of the latest technology in the
            store
          </p>
          <hr className="my-4" />
          <p>
            We have some advanced tech going on for this little old store ^^
          </p>
        </Jumbotron>
      </Fragment>
    );
  }
}

export default MainPage;
