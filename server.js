const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const assert = require("assert");
// const bodyParser = require("body-parser");
const app = express();

// app.use(bodyParser.json());
app.use(express.json());

const db_URL = "mongodb://localhost:27017";
const database = "Api-contactList";

MongoClient.connect(db_URL, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "failed to connect database");
  const db = client.db(database);

  app.post("/contactadd", (req, res) => {
    const newContact = req.body;
    db.collection("contactList").insertOne(newContact, (err, data) => {
      if (err) console.log("failed to create collection");
      else res.send("contact added");
    });
  });
  app.get("/fetchcontact", (req, res) => {
    db.collection("contactList")
      .find()
      .toArray((err, data) => {
        if (err) console.log("failed to fetch contacts");
        else res.send(data);
      });
  });
  app.get("/fetchcontact/:id", (req, res) => {
    let ID = ObjectID(req.params.id);
    db.collection("contactList").findOne({ _id: ID }, (err, data) => {
      if (err) res.send("failed to fetch contact");
      else res.send(data);
    });
  });
  app.put("/editcontact/:id", (req, res) => {
    let eID = ObjectID(req.params.id);
    let editedContact = req.body;
    db.collection("contactList").findOneAndUpdate(
      { _id: eID },
      { $set: { ...editedContact } },
      (err, data) => {
        if (err) {
          res.send("failed to eddit contact");
        } else res.send(data);
      }
    );
  });
  app.delete("/deletecontact/:id", (req, res) => {
    let rID = ObjectID(req.params.id);
    db.collection("contactList").findOneAndDelete({ _id: rID }, (err, data) => {
      if (err) {
        res.send("failed to delete contact");
      } else res.send("contact deleted");
    });
  });
});

//accer aux port par defaut
const port = process.env.Port || 5000;

app.listen(port, err => {
  if (err) console.log("connection to server failed");
  else console.log(`running on port ${port}`);
});
