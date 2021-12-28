import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="header-container">
          <nav className="navbar navbar-dark bg-dark mb-3">
                <Button className="block" type="button" variant="secondary">Home</Button>
                <Button className="block" type="button" variant="secondary">OtherPage</Button>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
