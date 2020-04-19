import React, { Fragment, useState } from "react";
import NavigationBar from "../NavigationBar";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import SalesTable from "./SalesTable";

const ReportPage = () => {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [results, setResults] = useState({});
  const [showSales, setShowSales] = useState(false);

  async function getSales(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowSales(false);
    const results = await fetch(
      `/api/getSales?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
    const allResults = await results.json();
    setResults(allResults);
    setShowSales(true);
  }

  return (
    <Fragment>
      <NavigationBar />
      <Form>
        <FormGroup>
          <Col>
            <Label for="dateFrom">From</Label>
            <Input
              type="date"
              name="dateFrom"
              id="dateFrom"
              placeholder="date placeholder"
              onChange={e => setDateFrom(e.target.value)}
            />
          </Col>
          <Col>
            <Label for="dateTo">To</Label>
            <Input
              type="date"
              name="dateTo"
              id="dateTo"
              placeholder="date placeholder"
              onChange={e => setDateTo(e.target.value)}
            />
          </Col>
          <Col>
            <Button
              style={{ marginTop: "20px" }}
              outline
              color="success"
              block
              onClick={getSales}
            >
              Generate Report
            </Button>
          </Col>
        </FormGroup>
      </Form>
      {showSales && <SalesTable sales={results} />}
    </Fragment>
  );
};

export default ReportPage;
