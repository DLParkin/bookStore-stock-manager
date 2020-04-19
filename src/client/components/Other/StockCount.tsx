import React, { useState, useEffect } from "react";
import { CardTitle, Card } from "reactstrap";

const StockCount = () => {
  const [count, setCount] = useState("");

  useEffect(() => {
    const getCount = async () => {
      const bookCount = await fetch(`/api/count`);
      const total = await bookCount.json();
      setCount(total[0].totalCount);
    };

    getCount();
  }, [count]);

  return (
    <Card style={{backgroundColor: "#178569", textAlign:"left", padding: "1rem", color: "#FFF", fontSize: "30px"}}>
      <CardTitle >{`${count} records found`}</CardTitle>
    </Card>
  );
};

export default StockCount;
