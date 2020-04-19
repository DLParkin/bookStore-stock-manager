import React, { Fragment, useState, useEffect } from "react";
import { Table } from "reactstrap";
import StatTableItem from "./StatTableItem";

const StockMovement = () => {
  const [dailyStats, setDailyStats] = useState([]);

  useEffect(() => {
    const getCount = async () => {
      const dailyStats = await fetch(`/api/dailyStats`);
      const result = await dailyStats.json();
      setDailyStats(result);
    };

    getCount();
  }, []);

  return (
    <Fragment>
      {dailyStats && (
        <Table striped hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Added</th>
              <th>Removed</th>
            </tr>
          </thead>
          <tbody>
            {dailyStats.map((stat, index) => {
              return <StatTableItem key={index} stat={stat} idx={index} />;
            })}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default StockMovement;
