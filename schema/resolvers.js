const {User, Event, Task} = require("../models");

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .sort({createdAt: -1})
                .select("-__v -password");
                // Populate events
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        }
    }
};

module.exports = resolvers;