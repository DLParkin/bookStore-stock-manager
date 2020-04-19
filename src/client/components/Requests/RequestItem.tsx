import React, { Fragment } from "react";

const RequestItem = (props: any) => {
  const items = props.item;
  return (
    <Fragment>
      {items &&
        items.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.date.substring(0,10)}</td>
            <td>{item.request}</td>
            <td>{item.name}</td>
            <td>{item.mobile}</td>
          </tr>
        ))}
    </Fragment>
  );
};

export default RequestItem;
