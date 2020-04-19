import React, { Fragment, useState, useEffect } from "react";
import RequestCardItem from "./RequestCardItem";

const CustomerRequests = (props: any) => {
  const requests = props.allRequests;
  const book = props.bookDetails;
  const [isbns, setIsbns] = useState([]);
  const [titles, setTitles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorsWild, setAuthorsWild] = useState([]);

  useEffect(() => {
    setRequests(requests, book);
  }, [book]);

  function setRequests(requests: any, book: any) {
    let foundIsbn = requests.map((i: any) => i).filter((b: { request: any; }) => b.request === book.isbn);
    setIsbns(foundIsbn);
    const foundTitle = requests
      .map((i: any) => i)
      .filter((b: { request: any; }) => b.request === book.title);
    setTitles(foundTitle);
    const author = book.author.trim();
    const foundAuthor = requests
      .map((i: any) => i)
      .filter((b: { request: string; }) => b.request.trim().toLowerCase() === author.toLowerCase());
    setAuthors(foundAuthor);
    const foundAuthorWild = requests
      .map((i: any) => i)
      .filter((b: { request: string; }) =>
        author
          .toLowerCase()
          .split(" ")
          .includes(b.request.trim().toLowerCase())
      );
    setAuthorsWild(foundAuthorWild);
  }

  return (
    <Fragment>
      {isbns && isbns.length !== 0 && (
        <RequestCardItem
          isbn={isbns}
          header="Someone may be looking for this ISBN"
        />
      )}
      {titles && titles.length !== 0 && (
        <RequestCardItem
          isbn={titles}
          header="Someone may be looking for this Title"
        />
      )}
      {authors && authors.length !== 0 && (
        <RequestCardItem
          isbn={authors}
          header="Someone is looking for this Author"
        />
      )}
      {authorsWild && authorsWild.length !== 0 && (
        <RequestCardItem
          isbn={authorsWild}
          header="Someone may be looking for this Author but may be just a guess"
        />
      )}
    </Fragment>
  );
};

export default CustomerRequests;
