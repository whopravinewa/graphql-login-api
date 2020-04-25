const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id : ID!
        name: String!
        email:String!
        password:String
    }

    input UserInputData{
        email:String!
        password:String!
        name:String!
    }

    type RootQuery{
        user : User!
    }

    type RootMutation{
        createUser(userInput : UserInputData):User!
    }

    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
