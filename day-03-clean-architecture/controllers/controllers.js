// Since we are not using database yet
// Below is the array to replace dataabse

let notes = [
  {
    name: "Bishal",
    hobby: "System Designer",
    description:
      "I am distributed system designer and I am responsible to build scalable system",
  },
];

// Controller to GET all notes
exports.getNotes = async (req, res) => {
  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
};

// Controller to CREATE note
exports.createNotes = async (req, res) => {
  try {
    const { name, hobby, description } = req.body;


    // if name and hobby field is empty then it will throw 404 status code
    if (!name || !hobby) {
      return res.status(400).json({ status: false, message: "Missing Field" });
    }

    // creating new variable to store updated value of array
    const newNote = {
      id: notes.length + 1,
      name,
      hobby,
      description,
    };

    // upated value pushed into new variable
    notes.push(newNote);

    // shows message with 201 created status code
    res.status(201).json({ status: true, data: newNote });
  } catch (error) {
    res.status(400).json({ success: false, message: "Note not found" });
  }
};

