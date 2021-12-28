import React from "react";
import ContactRow from "./Row";
import "./ContactTable.css";

function ContactTable(props) {
  return (
    <React.Fragment>
      <div className="col-md-7">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>SSN</th>
              </tr>
            </thead>
            <tbody>
              {props.contacts.map((c) => (
                <ContactRow 
                contact={c} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ContactTable;
