import React, { Component } from "react";
import "./App.css";
import { Link, Switch, Route } from "react-router-dom";
import ContactCard from "./components/ContactCard";
import axios from "axios";
import AddContact from "./components/AddContact";

export default class App extends Component {
  state = {
    list: [],
    name: "",
    email: "",
    phone: "",
    id: "",
    edit: false
  };

  componentDidMount = () => {
    this.getAllContacts();

    
  };

  getAllContacts = () => {
    axios.get("/fetchcontact").then(res => this.setState({ list: res.data }));
  };

  addContact = () => {
    axios
      .post("/contactadd", {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(this.getAllContacts);
    this.reset();
  };

  deleteContact = id => {
    axios
      .delete(`/deletecontact/${id}`)
      .then(this.getAllContacts)
      .catch(err => console.log(err));
  };

  handelChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  editContact = () => {
    axios
      .put(`/editcontact/${this.state.id}`, {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(this.getAllContacts)
      .catch(err => console.log(err));
    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      phone: "",
      email: "",
      edit: false
    });
  };

  getPerson = contact => {
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      id: contact._id,
      edit: true
    });
  };

  render() {
    return (
      <div>
        <h1>Contact List</h1>
        <Link to="/contact_list">
          <button>Contact List</button>
        </Link>
        <Link to="/add_contact">
          <button onClick={() => this.setState({ edit: false })}>
            Add Contact
          </button>
        </Link>

        <Switch>
          <Route
            path="/contact_list"
            render={() => (
              <div>
                {this.state.list.map(el => (
                  <ContactCard
                    contact={el}
                    deleteContact={this.deleteContact}
                    editContact={this.editContact}
                    getPerson={this.getPerson}
                  />
                ))}
              </div>
            )}
          />
          <Route
            path="/(add_contact|edit_contact)/"
            render={() => (
              <AddContact
                handelChange={this.handelChange}
                Action={this.state.edit ? this.editContact : this.addContact}
                contact={this.state}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
