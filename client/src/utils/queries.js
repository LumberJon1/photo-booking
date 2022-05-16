import {gql} from "@apollo/client";

export const QUERY_EVENTS = gql`
  query events($username: String) {
    events(username: $username) {
      _id
      eventName
      eventType
      eventDate
      tasks {
        _id
        name
      }
    }
  }
`;

export const QUERY_EVENT = gql`
  query event($id: ID) {
    event(id: $id) {
      _id
      eventName
      eventType
      eventDate
      tasks {
        _id
        name
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      firstName
      lastName
      events {
        _id
        eventName
        eventType
        eventDate
      }
    }
  }
`;