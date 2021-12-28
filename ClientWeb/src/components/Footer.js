import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footer-container">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright: All right reserved
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
