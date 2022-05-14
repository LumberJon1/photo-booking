const {User, Event, Task} = require("../models");
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .sort({createdAt: -1})
                .select("-__v -password")
                .populate("events");
        },
        events: async () => {
            return Event.find()
                .sort({createdAt: -1})
                .select("-__v")
                .populate("tasks")
        },
        // Resolve all tasks for a given event ID
        tasks: async (parent, eventId) => {
            return Event.findOne({_id: eventId})
                .select("tasks");


        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {username, password}) => {
            const user = await User.findOne({username});

            if (!user) {
                throw new AuthenticationError("Invalid Login Credentials");
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError("Invalid Login Credentials");
            }

            const token = signToken(user);
            return {token, user};
        },
        addEvent: async (parent, args) => {
            const event = await Event.create(args);

            return event;
        },
        addTask: async (parent, {eventId, name}) => {
            const updatedEvent = await Event.findOneAndUpdate(
                {_id: eventId},
                {$push: {tasks: {name}}},
                {new: true}
            );

            return updatedEvent;
        }
    }
};

module.exports = resolvers;