const { gql } = require('apollo-server');

// Query, Mutation, etc.
const typeDefs = gql`
    type Query {
        employee(id: ID!): Employee
        employeeList(department: String): [Employee]
    },

    type Employee {
        id: ID
        name: String
        dob: String
        department: String
        title: String
        avatarUrl: String
    }
`;

module.exports = typeDefs;