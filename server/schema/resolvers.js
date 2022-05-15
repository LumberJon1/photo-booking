const {User, Event} = require("../models");
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {

            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select("-__v -password")
                    .populate("events");
            
                return userData;
            }

            throw new AuthenticationError("Not Logged In");
        },
        users: async () => {
            return User.find()
                .sort({createdAt: -1})
                .select("-__v -password")
                .populate("events");
        },
        user: async (parent, {username}) => {
            return User.findOne({username})
                .select("-__v -password")
                .populate("events")
        },
        events: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Event.find(params)
                .sort({createdAt: -1})
                .select("-__v")
                .populate("tasks")
        },
        event: async (parent, {_id}) => {
            return Event.findOne({_id})
                .include("-__v")
                .populate("tasks")
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
        addEvent: async (parent, args, context) => {
            if (context.user) {
                const event = await Event.create({...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {events: event}},
                    {new: true}
                );

                return event;
            }

            throw new AuthenticationError("You need to be logged in.");
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