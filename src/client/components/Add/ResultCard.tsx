import React, { Fragment } from "react";
import { CardHeader, CardBody, Card } from "reactstrap";

const ResultCard = (props: any) => {
  const result = props.result;

  return (
    <Fragment>
      <Card>
        <CardHeader>{result.title && result.title}</CardHeader>
        <CardBody>
          <p>ISBN: {result.isbn && result.isbn}</p>
          <p>Author: {result.author && result.author}</p>
          <p>
            Publish on {result.publishDate && result.publishDate} by{" "}
            {result.publisher && result.publisher}
          </p>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ResultCard;
