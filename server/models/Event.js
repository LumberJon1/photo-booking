const {Schema, model} = require("mongoose");
const taskSchema = require("./Task");

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
            type: Date,
            default: Date.now,
            // Consider formatting date in easier format
            required: true
        },
        duration: {
            type: Number,
            min: 0.25,
            max: 12,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        tasks: [taskSchema]
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;