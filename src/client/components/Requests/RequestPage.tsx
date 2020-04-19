import React, { Fragment } from "react";
import { Container } from "reactstrap";
import NavigationBar from "../NavigationBar";
import RequestAddForm from "./RequestAddForm";

const RequestPage = () => {
  return (
    <Fragment>
      <Container>
        <NavigationBar />
          <h1>Request Add</h1>
          <RequestAddForm/>
      </Container>
    </Fragment>
  );
};

export default RequestPage;
