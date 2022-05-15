const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        firstName: String
        lastName: String
        events: [Event]
    }

    type Event {
        _id: ID
        eventName: String
        eventType: String
        eventDate: String
        username: String
        tasks: [Task]
    }

    type Task {
        _id: ID
        name: String
    }

    type Query {
        me: User
        events(username: String): [Event]
        event(_id: ID): Event
        users: [User]
        user(username: String): User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!, firstName: String!, lastName: String): Auth
        addEvent(eventName: String, eventType: String, eventDate: String, username: String!): Event
        addTask(name: String!): Task
    }
    
    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;