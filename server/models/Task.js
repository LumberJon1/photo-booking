const {Schema} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
            get: dueDate => dateFormat(dueDate)
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = taskSchema;