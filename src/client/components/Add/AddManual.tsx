import React, { Fragment } from "react";
import ManualAddForm from "./ManualAddForm";
import NavigationBar from "../NavigationBar";

const AddManual = () => {
  return (
    <Fragment>
      <NavigationBar />
        <h1>Manual Add</h1>
        <ManualAddForm />
    </Fragment>
  );
};

export default AddManual;
