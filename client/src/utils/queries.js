import {gql} from "@apollo/client";

export const QUERY_EVENTS = gql`
query user($username: String!) {
    user(username: $username) {
      _id
      username
      events {
        _id
        eventName
        eventType
      }
    }
  }`;