import "./App.css";
import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactTable from "./components/ContactTable";
import InputRow from "./components/InputRow";
import { environment } from "./environment/environment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleSSNFormChange = this.handleSSNFormChange.bind(this);
    this.handleInputFormChange = this.handleInputFormChange.bind(this);
    this.ssnValidation = this.ssnValidation.bind(this);
    this.ssnUniqueValidation = this.ssnUniqueValidation.bind(this);
    this.textValidation = this.textValidation.bind(this);
    this.state = {
      contacts: [],
      firstName: "",
      lastName: "",
      address: "",
      ssn: "",
      ssnErrorMessage: "",
      inputErrorMessage: "",
    };
  }

  componentDidMount() {
    fetch(environment.apiURL + "api/members")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ contacts: response });
      });
  }

  handleFormChange(e) {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    this.setState({ [fieldName]: fieldValue });
  }

  handleSSNFormChange(e) {
    e.preventDefault();
    this.handleFormChange(e);
    this.ssnValidation(e);
  }

  handleInputFormChange(e) {
    e.preventDefault();
    this.handleFormChange(e);
    this.textValidation(e);
  }

  handleAddFormSubmit(e) {
    if (
      this.state.inputErrorMessage == "" &&
      this.state.ssnErrorMessage == ""
    ) {
      e.preventDefault();
      const newContact = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        ssn: this.state.ssn,
      };
      const currentContacts = this.state.contacts;
      const newContacts = [...currentContacts, newContact];
      const a = JSON.stringify(newContact);
      fetch(environment.apiURL + "api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      })
        .then(() => {
          this.setState({ contacts: newContacts });
          this.handleResetClick();
        })
        .catch((error) => {
          this.setState({ ssnErrorMessage: error });
        });
    }
  }

  handleResetClick() {
    this.setState({
      firstName: "",
      lastName: "",
      address: "",
      ssn: "",
      ssnErrorMessage: "",
      inputErrorMessage: "",
    });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  }

  ssnValidation(e) {
    e.preventDefault();
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    const notValid = !e.target.value || regex.test(e.target.value) === false;
    if (!notValid) {
      this.ssnUniqueValidation(e);
    } else {
      this.setState({
        ssnErrorMessage: notValid ? "Invalid SSN, format ###-##-####" : "",
      });
    }
  }

  ssnUniqueValidation(e) {
    e.preventDefault();
    const contacts = this.state.contacts;
    const ssnValues = contacts.map((c) => c.ssn);
    const invalid = ssnValues.includes(e.target.value);
    this.setState({
      ssnErrorMessage: invalid ? "Duplicated SSN value" : "",
    });
  }

  textValidation(e) {
    e.preventDefault();
    const filedValue = e.target.value;
    const invalid = filedValue.length <= 1;
    this.setState({
      inputErrorMessage: invalid ? "Inputs must be at least 2 characters" : "",
    });
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="card">
          <div className="row">
            <div className="col-md-4 add-contact-container">
              <h5>Add Contact</h5>
              <form onSubmit={this.handleAddFormSubmit}>
                <InputRow
                  name="firstName"
                  placeholder="First Name"
                  handleAddFormChange={this.handleInputFormChange}
                />
                <InputRow
                  name="lastName"
                  placeholder="Last Name"
                  handleAddFormChange={this.handleInputFormChange}
                />
                <InputRow
                  name="address"
                  placeholder="Address"
                  handleAddFormChange={this.handleInputFormChange}
                />
                <InputRow
                  name="ssn"
                  placeholder="SSN"
                  handleAddFormChange={this.handleSSNFormChange}
                />
                <h6 color="red">{this.state.inputErrorMessage}</h6>
                <h6 color="red">{this.state.ssnErrorMessage}</h6>
                <Row>
                  <div className="col-md-6 button-container">
                    <Button
                      className="button"
                      type="submit"
                      variant="primary"
                      disabled={
                        this.state.inputErrorMessage != "" ||
                        this.state.ssnErrorMessage != ""
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <div className="col-md-6 button-container">
                    <Button
                      className="button"
                      type="button"
                      variant="secondary"
                      onClick={this.handleResetClick}
                    >
                      Reset
                    </Button>
                  </div>
                </Row>
              </form>
            </div>
            <ContactTable contacts={this.state.contacts} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
