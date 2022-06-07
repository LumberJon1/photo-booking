const {User, Event} = require("../models");
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require("../utils/auth");
const { update } = require("../models/User");

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
        event: async (parent, {id}) => {
            return Event.findOne({_id: id})
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
        addTask: async (parent, {eventID, name, dueDate}) => {
            const updatedEvent = await Event.findOneAndUpdate(
                {_id: eventID},
                {$push: {tasks: {name: name, dueDate: dueDate}}},
                {new: true}
            );

            return updatedEvent;
        },

        // Mutations to edit (update) data...

        // Update a user
        editUser: async (parent, {userID, ...userData}, context) => {

            if (context.user) {
                console.log(userData);
                const updatedUser = await User.findOneAndUpdate(
                    {_id: userID},
                    {
                        username: userData.username,
                        email: userData.email,
                        password: userData.password,
                        firstName: userData.firstName,
                        lastName: userData.lastName
                    },
                    {new: true}
                    );
                    
                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in.");
        },


        editEvent: async (parent, {eventID, eventName, eventType, eventDate}) => {
            const updatedEvent = await Event.findOneAndUpdate(
                {_id: eventID},
                {eventName: eventName, eventType: eventType, eventDate: eventDate},
                {new: true}
            );

            return updatedEvent;
        },

        editTask: async (parent, {eventID, taskID, name, dueDate, completed}) => {
            const updatedEvent = await Event.findOneAndUpdate(
                {_id: eventID, "tasks._id": taskID},
                {
                    "$set": {
                        "tasks.$.name": name,
                        "tasks.$.dueDate": dueDate,
                        "tasks.$.completed": completed
                    }
                },
                {new: true}
            );
            return updatedEvent;
        },

        // Mutations to delete data...

        // Delete a user
        deleteUser: async (parent, {userID}, context) => {

            if (context.user) {
                const deletedUser = await User.findOneAndDelete(
                    {_id: userID},
                    {}
                );
                
                return deletedUser;
            }

            throw new AuthenticationError("You need to be logged in.");
        },

        // Delete a task from a parent event using event ID and taskID
        deleteTask: async (parent, {eventID, taskID,}) => {

            // Find parent event
            const parentEvent = await Event.findOneAndUpdate(
                {_id: eventID},
                {$pull: {tasks: {_id: taskID}}},
                {new: true}
                );
                
            return parentEvent;
        },

        // Delete an event from a user's events array
        deleteEvent: async (parent, {eventID}, context) => {
            if (context.user) {
                console.log(eventID);
                console.log(context.user);
                const event = await Event.findOneAndDelete({_id: eventID});

                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {events: {_id: eventID}}},
                    {new: true}
                )
                .populate("events");

                console.log(updatedUser);
                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in.");
        }


    }
};

module.exports = resolvers;