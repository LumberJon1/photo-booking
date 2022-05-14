const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        users: [User]
    }

`;

module.exports = typeDefs;