import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";

interface SaleItemProp {
  sales: [];
}

export default class TableData extends Component<SaleItemProp> {
  render() {
    const tableData = this.props.sales;
    return (
      <Fragment>
        <Table className="report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sales &&
              tableData.map((data: any, index) => (
                <tr key={index}>
                  <td>{parseInt(data.date.substring(8,10)) + 1}{data.date.substring(4,7)}-{data.date.substring(0,4)}</td>
                  <td>{data.isbn}</td>
                  <td>{data.title}</td>
                  <td>{data.author}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
