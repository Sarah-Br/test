import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

export default function ContactCard({ contact, deleteContact, getPerson }) {
  return (
    <div>
      <Card title={contact.name} style={{ width: 300 }}>
        <p>{contact.name}</p>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <Link to="/edit_contact">
          <button onClick={() => getPerson(contact)}>Edit</button>
        </Link>
        <button onClick={() => deleteContact(contact._id)}>Delete</button>
      </Card>
    </div>
  );
}
