import React from "react";
import { Spinner as Loading } from "reactstrap";

const Spinner = () => {
  return (
    <Loading
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "4rem",
        height: "4rem"
      }}
      color="primary"
    />
  );
};

export default Spinner;
