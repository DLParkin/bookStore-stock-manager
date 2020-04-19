import React, { Fragment, useState } from "react";
import {
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  FormText,
  Col
} from "reactstrap";
import Toasts from "../Other/Toasts";

const RequestAddForm = () => {
  const [request, setRequest] = useState({
    name: "",
    date: "",
    mobile: "",
    request: ""
  });
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const updateForm = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    setRequest({
      ...request,
      [e.target.name]: value
    });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (
      (request.name !== "",
      request.date !== "",
      request.mobile !== "",
      request.request !== "")
    ) {
      setSuccessToast(true);
      await fetch(`/api/requestAdd?request=${JSON.stringify(request)}`);
      setTimeout(() => {
        setSuccessToast(false);
      }, 3000);
      setRequest({
        name: "",
        date: "",
        mobile: "",
        request: ""
      });
    } else {
      setErrorToast(true);
      setTimeout(() => {
        setErrorToast(false);
      }, 2000);
    }
  };

  return (
    <Fragment>
      {successToast && (
        <Toasts
          icon="success"
          headerText="Added Request"
          bodyText="Request has been added!"
        />
      )}
      {errorToast && (
        <Toasts
          icon="danger"
          headerText="Request Failure"
          bodyText="Failed to add Request! Check all fields have been completed.."
        />
      )}
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="name"
              id="name"
              value={request.name}
              placeholder="Name..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="date" sm={2}>
            Date
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="date"
              name="date"
              id="date"
              value={request.date}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="mobile" sm={2}>
            Mobile
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="mobile"
              id="mobile"
              value={request.mobile}
              placeholder="Mobile Number..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="request" sm={2}>
            Request
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="request"
              id="request"
              value={request.request}
              placeholder="Request..."
            />
            <FormText color="muted">
              Keep the request information simple i.e book title, isbn or author
              name
            </FormText>
          </Col>
        </FormGroup>
        <Button onClick={submitForm} outline color="Success" size="lg" block>
          Add Request
        </Button>
      </Form>
    </Fragment>
  );
};

export default RequestAddForm;
