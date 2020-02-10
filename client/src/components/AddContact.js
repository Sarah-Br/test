import React from "react";
import { Link } from "react-router-dom";

export default function AddContact({ handelChange, Action, contact }) {
  return (
    <div className="add-card">
      <p className="card-title-add">
        {contact.edit ? "Edit Contact" : "Add Contact"}
      </p>
      <input
        name="name"
        type="text"
        placeholder="Name..."
        value={contact.name}
        onChange={handelChange}
      />
      <input
        name="phone"
        type="text"
        placeholder="Phone..."
        value={contact.phone}
        onChange={handelChange}
      />
      <input
        name="email"
        type="text"
        placeholder="Email..."
        value={contact.email}
        onChange={handelChange}
      />
      <Link to="/contact_list">
        <input
          type="button"
          value={contact.edit ? "Save" : "Add Contact"}
          onClick={Action}
        />
      </Link>
    </div>
  );
}
