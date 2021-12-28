import React from "react";
import Row from "react-bootstrap/Row";

function InputRow(props) {
  return (
    <Row>
      <div className="form-group">
        <input
          className="form-control mb-3"
          type="text"
          name={props.name}
          required="required"
          placeholder={props.placeholder}
          onChange={props.handleAddFormChange}
        />
      </div>
    </Row>
  );
}

export default InputRow;
