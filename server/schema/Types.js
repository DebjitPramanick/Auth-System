const graphql = require('graphql')

const  {GraphQLID, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLList, 
    GraphQLNonNull,
    GraphQLObjectType
} = graphql


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        userID: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

const AuthType = new GraphQLObjectType({
    name: "Auth",
    fields: () => ({
        id: { type: GraphQLID },
        accessToken: { type: GraphQLString },
        refreshToken: { type: GraphQLString },
        accesstokenExp: { type: GraphQLString },
        refreshtokenExp: { type: GraphQLString }
    })
})

module.exports = {
    AuthType,
    UserType
}

