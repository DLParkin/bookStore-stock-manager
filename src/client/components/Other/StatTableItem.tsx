import React from "react";

const StatTableItem = (props: any) => {
  const stat = props.stat;
  const idx = props.idx;

  return (
    <tr key={idx}>
      <td>{stat.date.substring(0,10)}</td>
      <td>{stat.booksadded}</td>
      <td>{stat.booksremoved}</td>
    </tr>
  );
};

export default StatTableItem;