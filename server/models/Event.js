const {Schema, model} = require("mongoose");
const taskSchema = require("./Task");
const dateFormat = require("../utils/dateFormat");

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            required: true
        },
        eventType: {
            type: String,
            required: true
        },
        eventDate: {
            required: true,
            type: Date,
            default: Date.now,
            get: dueDate => dateFormat(dueDate)
        },
        duration: {
            type: Number,
            min: 0.25,
            max: 12,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true
        },
        tasks: [taskSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

eventSchema.virtual("taskCount").get(function() {
    return this.tasks.length;
});

const Event = model("Event", eventSchema);

module.exports = Event;