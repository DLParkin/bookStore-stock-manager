import React, { Fragment } from "react";
import { Container } from "reactstrap";
import NavigationBar from "../NavigationBar";
import StockCount from "./StockCount";
import StockMovement from "./StockMovement";

const Stats = () => {
  return (
    <Fragment>
      <NavigationBar />
        <h1 style={{ padding: "2rem" }}>Stats Page</h1>
        <StockCount />
        <h1 style={{ padding: "2rem" }}>Daily Stock Movement</h1>
        <StockMovement />
    </Fragment>
  );
};

export default Stats;
