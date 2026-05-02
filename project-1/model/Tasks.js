const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const taskSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },

        description:{
            type: String,
            required: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },

        priority:{
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Task', taskSchema);