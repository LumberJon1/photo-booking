const {Schema, model} = require("mongoose");

taskSchema = new Schema(
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
        },
        parentEvent: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true
        }
    }
)


const Task = model("Task", taskSchema);

module.exports = Task;