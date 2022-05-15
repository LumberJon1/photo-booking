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
        dueDate: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String): User
        events(username: String): [Event]
        event(_id: ID!): Event
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String): Auth
        login(username: String!, password: String!): Auth
        addEvent(eventName: String!, eventType: String!, eventDate: String, duration: Float!, location: String!, username: String): Event
        addTask(eventId: ID!, name: String!, dueDate: String, completed: Boolean): Event
    }
    
    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;