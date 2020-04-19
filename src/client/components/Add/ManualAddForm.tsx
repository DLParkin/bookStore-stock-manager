import React, { useState, Fragment } from "react";
import { FormGroup, Label, Input, Button, Form, Col } from "reactstrap";
import Toasts from "../Other/Toasts";

const ManualAddForm = () => {
  const [book, setBook] = useState({
    barcode: "",
    isbn: "",
    title: "",
    author: "",
    publisherDate: "",
    publisher: ""
  });
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const updateForm = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    setBook({
      ...book,
      [e.target.name]: value
    });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (
      (book.barcode !== "",
      book.isbn !== "",
      book.title !== "",
      book.author !== "",
      book.publisherDate !== "",
      book.publisher != "")
    ) {
      setSuccessToast(true);
      await fetch(`/api/insert?book=${JSON.stringify(book)}`);
      setTimeout(() => {
        setSuccessToast(false);
      }, 3000);
      setBook({
        barcode: "",
        isbn: "",
        title: "",
        author: "",
        publisherDate: "",
        publisher: ""
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
          headerText="Manual Add Success"
          bodyText="Book has been added!"
        />
      )}
      {errorToast && (
        <Toasts
          icon="danger"
          headerText="Manual Add Failure"
          bodyText="Failed to add book! Check all fields have been completed.."
        />
      )}
      <Form>
        <FormGroup row>
          <Label for="barcode" sm={2}>
            Barcode
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="barcode"
              id="barcode"
              value={book.barcode}
              placeholder="Barcode..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="isbn" sm={2}>
            ISBN
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="isbn"
              id="isbn"
              value={book.isbn}
              placeholder="ISBN..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="title" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="title"
              id="title"
              value={book.title}
              placeholder="Title..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="author" sm={2}>
            Author
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="author"
              id="author"
              value={book.author}
              placeholder="Author..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="year" sm={2}>
            Year
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="text"
              name="publisherDate"
              id="publisherDate"
              value={book.publisherDate}
              placeholder="Year..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="details" sm={2}>
            Details
          </Label>
          <Col sm={10}>
            <Input
              onChange={updateForm}
              type="textarea"
              name="publisher"
              id="publisher"
              value={book.publisher}
              placeholder="Details.."
            />
          </Col>
        </FormGroup>
        <Button onClick={submitForm} outline color="Success" size="lg" block>
          Add
        </Button>
      </Form>
    </Fragment>
  );
};

export default ManualAddForm;
