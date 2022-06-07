import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!, $firstName: String!, $lastName: String) {
        addUser(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_EVENT = gql`
    mutation addEvent($eventName: String, $eventType: String, $eventDate: String, $username: String!) {
        addEvent(eventName: $eventName, eventType: $eventType, eventDate: $eventDate, username: $username) {
            _id
            eventName
            eventType
            eventDate
        }
    }
`;

export const ADD_TASK = gql`
    mutation addTask($eventID: ID!, $name: String!, $dueDate: String){
        addTask(eventID: $eventID, name: $name, dueDate: $dueDate) {
        _id
        eventName
        tasks {
            _id
            name
            dueDate
            completed
        }
        }
    }
`;

// Mutations for updating data
export const EDIT_EVENT = gql`
    mutation editEvent($eventID: ID!, $eventName: String, $eventType: String, $eventDate: String){
        editEvent(eventID: $eventID, eventName: $eventName, eventType: $eventType, eventDate: $eventDate) {
            _id
            eventName
            eventType
            eventDate
            tasks {
                _id
                name
                dueDate
                completed
            }
        }
    }
`;

export const EDIT_TASK = gql`
mutation editTask($eventID: ID!, $taskID: ID!, $name: String, $dueDate: String, $completed: String){
    editTask(eventID: $eventID, taskID: $taskID, name: $name, dueDate: $dueDate, completed: $completed) {
        _id
        eventName
        tasks {
            _id
            name
            dueDate
            completed
        }
    }
}
`