const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        firstName: String
        lastName: String
    }

    type Task {
        name: String
        dueDate: String
        completed: Boolean
    }

    type Event {
        _id: ID
        eventName: String
        eventType: String
        eventDate: String
        duration: Float
        location: String
        tasks: [Task]
    }

    type Query {
        users: [User]

    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String): User
    }

`;

module.exports = typeDefs;