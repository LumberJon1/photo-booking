import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                firstName
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!, firstName: String, lastName: String) {
        addUser(username: $username, password: $password, email: $email, firstName: $firstname, lastName: $lastName) {
            token
            user {
                _id
                username
            }
        }
    }
`