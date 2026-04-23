const Note = require("../models/Notes");
const asyncHandler = require('../utils/asyncHandler');

// Controller to GET all notes
exports.getNote = asyncHandler(async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if(!note){
      return res.status(404).json({
        success: false,
        message: "No note found"
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    next(error);
  }
});

// Controller to CREATE note
exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({
      success: true,
      data: note,
    });

  } catch (error) {
    // handling duplicate values
    if(error.code === 11000){
      return res.status(400).json({
        success: false,
        message: "Entered duplicate value, enter unique values"
      });
    }

    // handling validation error
    if(error.name === 'ValidationError'){
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages
      });
    }

    // handling default errors

    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
};
