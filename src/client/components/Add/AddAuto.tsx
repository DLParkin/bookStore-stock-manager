import React, { Fragment, useState, useRef, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import { Input, Form, FormGroup, Label, Button } from "reactstrap";
import ResultCard from "./ResultCard";
import Toasts from "../Other/Toasts";
import Loading from "../Other/Spinner";
import { sanitizeInput, sanitizeInputDate } from "../_helper/sqlHelper";
import CustomerRequests from "../Requests/CustomerRequests";

const AddAuto = () => {
  const [book, setBook] = useState("");
  const [found, setFound] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    barcode: "",
    isbn: "",
    title: "",
    author: "",
    publishDate: "",
    publisher: ""
  });
  const [loading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    if (isUpdating) {
      inputRef.current.focus();
    }
  }, [isUpdating, book]);

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    const requests = await fetch(`/api/getAllRequests`);
    const allReq = await requests.json();
    setAllRequests(allReq);
  }

  async function autoSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setBookDetails({
      barcode: "",
      isbn: "",
      title: "",
      author: "",
      publishDate: "",
      publisher: ""
    });
    setFound(false);
    setBook("");
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 2000);
    setLoading(false);
  }

  return (
    <Fragment>
      <NavigationBar />
      <h1>Auto Find Books</h1>
      <Form onSubmit={autoSearch}>
        <FormGroup>
          <Label for="add">Add book to database</Label>
          <Input
            autoFocus
            ref={inputRef}
            type="text"
            name="text"
            id="add"
            value={book}
            placeholder="Auto Add.."
            onChange={e => setBook(e.target.value)}
          />
        </FormGroup>
        <Button outline color="Success" size="lg" block onClick={autoSearch}>
          Add
        </Button>
      </Form>
      {loading && <Loading />}
      {isUpdating && found && (
        <Toasts
          icon="Success"
          headerText="Adding Book"
          bodyText="Book added successfully"
        />
      )}
      {isUpdating && !found && (
        <Toasts
          icon="Warning"
          headerText="Adding Book Failed"
          bodyText="Book details have not been found, please enter manually!"
        />
      )}
      {bookDetails && allRequests && found && (
        <Fragment>
          <ResultCard result={bookDetails} barcode={book} />
          <CustomerRequests
            allRequests={allRequests}
            bookDetails={bookDetails}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export interface IAppProps {}

export interface IAppState {
  book: Array<{
    barcode: string;
    isbn: string;
    title: string;
    author: string;
    year: string;
    DateOfEntry: string;
  }>;
}

export default AddAuto;
