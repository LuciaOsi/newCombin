import React from "react";

const Row = ({ contact }) => {
  return (
    <tr key={contact.ssn}>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.address}</td>
      <td>{contact.ssn}</td>
    </tr>
  );
};
export default Row;
