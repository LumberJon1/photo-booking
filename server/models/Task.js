const {Schema} = require("mongoose");

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        dueDate: {
            type: Date,
            default: Date.now,
            required: true,
            // reformat
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = taskSchema;