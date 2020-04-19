import React from "react";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";

const Toasts = (props: any) => {
  const icon = props.icon;
  const headerText = props.headerText;
  const bodyText = props.bodyText;
  return (
    <Toast
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        width: "300px"
      }}
    >
      <ToastHeader icon={icon ? icon : <Spinner size="sm" />}>
        {headerText ? headerText : "Oh something is wrong!"}
      </ToastHeader>
      <ToastBody>{bodyText ? bodyText : "Seriously wrong :("}</ToastBody>
    </Toast>
  );
};

export default Toasts;
