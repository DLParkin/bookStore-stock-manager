import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Table} from "reactstrap";
import "../../scss/app.scss";
import NavigationBar from "../NavigationBar";
import BookTableItem from "./BookTableItem";
import Toasts from "./Toasts";

class Find extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      books: [],
      search: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  async handleChange(event: any) {
    event.preventDefault();
    this.setState({ search: event.target.value });
    let r = await fetch(`/api/filter?search=${event.target.value}`);
    let books = await r.json();
    this.setState({ books });
  }

  async updateList(searchTerm: any) {
    this.setState({ loading: true });
    this.setState({ search: searchTerm });
    let r = await fetch(`/api/filter?search=${this.state.search}`);
    let books = await r.json();
    this.setState({ books });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }
  render() {
    return (
      <Fragment>
          <NavigationBar />
          <Form className="">
            <FormGroup>
              <Label for="bookFilter">Search For Books</Label>
              <Input
                name="search"
                type="text"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
          {this.state.loading && (
            <Toasts
              icon={"success"}
              headerText="Book Removed"
              bodyText="Book has been removed from the database"
            />
          )}
          {this.state.books && this.state.search && (
            <Table striped hover>
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book, index) => {
                  return (
                    <BookTableItem
                      key={index}
                      book={book}
                      idx={index}
                      updateList={this.updateList}
                      search={this.state.search}
                    />
                  );
                })}
              </tbody>
            </Table>
          )}
      </Fragment>
    );
  }
}

export interface IAppProps {}

export interface IAppState {
  books: Array<{
    isbn: string;
    title: string;
    author: string;
    year: string;
    DateOfEntry: string;
  }>;
  search: string;
  loading: boolean;
}

export default Find;
function newFunction() {
  <Toasts />;
}
