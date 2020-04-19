import React, { useState, useRef, Fragment, useEffect } from "react";
import { FormGroup, Form, Input, Button, Label } from "reactstrap";
import Toasts from "../Other/Toasts";

const RemoveForm = () => {
  const [book, setBook] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [deletedFailed, setDeletedFailed] = useState(false);
  const [deletedEmpty, setDeletedEmpty] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isUpdating) {
      inputRef.current.focus();
    }
  }, [isUpdating]);

  async function getBookDetails(isbn: any) {
    try {
      await fetch(`/api/updateSales?isbn=${isbn}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (book === "") {
      setDeletedEmpty(true);
      setBook("");
      setTimeout(() => {
        setDeletedEmpty(false);
      }, 2000);
    } else {
      const exists = await fetch(`/api/find?id=${book}`);
      let res = await exists.json();
      if (res.count === 0) {
        setDeletedFailed(true);
        setBook("");
        setTimeout(() => {
          setDeletedFailed(false);
        }, 2000);
        // lets record how many are not actually exisiting
      } else {
        const found = getBookDetails(book);
        await fetch(`/api/deleteISBN?id=${book}`).then(async () => {
          setDeletedSuccess(true);
          setBook("");
          setTimeout(() => {
            setDeletedSuccess(false);
          }, 2000);
        });
      }
    }
    setIsUpdating(true);
    setIsUpdating(false);
  }

  return (
    <Fragment>
      {deletedSuccess && (
        <Toasts
          icon={"success"}
          headerText={"Book Removed"}
          bodyText={"You have removed the book."}
        />
      )}
      {deletedFailed && (
        <Toasts
          icon={"danger"}
          headerText={"Book Not Removed"}
          bodyText={"The book was not located in the database."}
        />
      )}
      {deletedEmpty && (
        <Toasts
          icon={"warning"}
          headerText={"No Text Entered"}
          bodyText={"Nothing in the input :("}
        />
      )}
      <Form onSubmit={removeBook}>
        <FormGroup>
          <Label for="remove">Remove books from the database.</Label>
          <Input
            autoFocus
            ref={inputRef}
            type="text"
            name="text"
            id="remove"
            value={book}
            placeholder="Remove"
            onChange={e => setBook(e.target.value)}
          />
        </FormGroup>
        <Button outline color="Success" size="lg" block onClick={removeBook}>
          Remove
        </Button>
      </Form>
    </Fragment>
  );
};

export default RemoveForm;
