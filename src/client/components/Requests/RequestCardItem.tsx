import React, { Fragment, useState, useEffect } from "react";
import { CardBody, Card, CardHeader, Table } from "reactstrap";
import RequestItem from "./RequestItem";

const RequestCardItem = (props: any) => {
  const isbn = props.isbn;
  const header = props.header;

  return (
    <Card style={{ marginTop: "1rem" }}>
      <CardHeader>{header}</CardHeader>
      <CardBody className="request-card">
        <Table bordered striped>
          <thead>
            <tr>
              <td>Date</td>
              <td>Request</td>
              <td>Name</td>
              <td>Phone</td>
            </tr>
          </thead>
          <tbody>
            <RequestItem item={isbn} />
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default RequestCardItem;
