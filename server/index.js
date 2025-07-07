const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

let notesCollection;

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const db = client.db("notes_app");
    notesCollection = db.collection("notes");

   
// GET all notes
app.get("/notes", (req, res) => {
  notesCollection.find().sort({ date: -1 }).toArray()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET single note by ID
app.get("/notes/:id", (req, res) => {
  notesCollection.findOne({ _id: new ObjectId(req.params.id) })
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

// CREATE new note
app.post("/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    content: req.body.content,
    deadline: req.body.deadline ? new Date(req.body.deadline) : null,
    date: new Date(),
  };
  notesCollection.insertOne(newNote)
    .then(() => res.json({ message: "Note created!" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// UPDATE note by ID
app.put("/notes/:id", (req, res) => {
  const updateFields = {
    title: req.body.title,
    content: req.body.content,
    deadline: req.body.deadline ? new Date(req.body.deadline) : null,
  };
  notesCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields }
  )
    .then(() => res.json({ message: "Note updated!" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE note by ID
app.delete("/notes/:id", (req, res) => {
  notesCollection.deleteOne({ _id: new ObjectId(req.params.id) })
    .then(() => res.json({ message: "Note deleted!" }))
    .catch(err => res.status(500).json({ error: err.message }));
});
