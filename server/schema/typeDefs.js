const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type Task {
        _id: ID
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

    type User {
        _id: ID
        username: String
        email: String
        firstName: String
        lastName: String
        events: [Event]
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        events: [Event]
        event(_id: ID): Event
        tasks: [Task]
        task(_id: ID): Task
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String): Auth
        login(username: String!, password: String!): Auth
        addEvent(eventName: String!, eventType: String!, eventDate: String, duration: Float!, location: String!): Event
        addTask(eventId: ID!, name: String!, dueDate: String, completed: Boolean): Event
    }

`;

module.exports = typeDefs;