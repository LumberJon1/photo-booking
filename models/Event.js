const {Schema, model} = require("mongoose");

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
        // tasks: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Task"
        //     }
        // ]
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;