import React, { Fragment } from "react";
import { Button } from "reactstrap";

const BookTableItem = (props: any) => {
  const book = props.book;
  const idx = props.idx;
  const updateList = props.updateList;
  const searchTerm = props.search;

  async function removeBook() {
    await fetch(`/api/delete?id=${book.id}`).then(async () => {
      await updateList(searchTerm);
    });
  }

  return (
    <tr key={idx}>
      <td>{book.isbn}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>
        <Button name="delete" color="danger" onClick={removeBook}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export interface IAppProps {}

export interface IAppState {
  book: Array<{
    isbn: string;
    title: string;
    author: string;
    year: string;
    DateOfEntry: string;
  }>;
  search: string;
}

export default BookTableItem;
