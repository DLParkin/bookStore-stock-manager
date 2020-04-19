import React, { Fragment, useRef } from "react";
import { CardBody, Card, CardHeader, Col, Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import TableData from "./TableData";

const SalesTable = (props: any) => {
  const sales = props.sales;
  const componentRef = useRef();

  if (sales.length === 0) {
    return (
      <Col>
        <Card className="sales-card">
          <CardHeader>No Results Found!</CardHeader>
          <CardBody>
            Please check the date range selected and try again!
          </CardBody>
        </Card>
      </Col>
    );
  }

  return (
    <Fragment>
      <Col>
        <ReactToPrint
          trigger={() => (
            <Button style={{ marginTop: "20px" }} outline color="info" block>
              Print Report
            </Button>
          )}
          content={() => componentRef.current}
        />
        <TableData sales={sales} ref={componentRef} />
      </Col>
    </Fragment>
  );
};

export default SalesTable;
