const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

let notes = [];

app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

app.post("/notes", (req, res) => {
  const newNote = req.body;

  if(!newNote || Object.keys(newNote).length === 0){
    return res.status(400).json({message: "No notes found"});
  }

  newNote.id = Date.now();
  notes.push(newNote);
  res.status(201).json({message: "New note is created"});
});

app.get("/notes/:id", (req, res) => {
  const singleNote = notes.find((u) => u.id == req.params.id);
  res.status(200).json(singleNote);
});

app.delete("/notes/:id", (req, res) => {
  const noteExisted = notes.find((t) => t.id == req.params.id);

  if (!noteExisted) {
    return res.status(404).json({ message: "Note not found" });
  }
  notes = notes.filter((t) => t.id != req.params.id);
  res.json({ message: "Note is deleted"});
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
