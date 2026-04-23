const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name cannot be more than 50 characters'],
        unique: true,
        trim: true
    },
    hobby:{
        type: String,
        required: [true, 'Please add a hobby'],
        enum: ['System Designer', 'Developer', 'Researcher', 'Student']
    },
    description:{
        type: String,
        required: [true, 'Please add a description']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);