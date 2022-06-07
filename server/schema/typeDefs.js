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
        completed: Boolean
    }

    type Query {
        me: User
        events(username: String): [Event]
        event(id: ID): Event
        users: [User]
        user(username: String): User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!, firstName: String!, lastName: String): Auth
        addEvent(eventName: String, eventType: String, eventDate: String, username: String!): Event
        addTask(eventID: ID!, name: String!, dueDate: String): Event
        
        editUser(userID: ID!, username: String, email: String, password: String, firstName: String, lastName: String): User
        editEvent(eventID: ID!, eventName: String, eventType: String, eventDate: String): Event
        editTask(eventID: ID!, taskID: ID!, name: String, dueDate: String, completed: String): Event
    
        deleteUser(userID: ID!): User
        deleteEvent(eventID: ID!): User
        deleteTask(eventID: ID!, taskID: ID!): Event
    }
    
    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;