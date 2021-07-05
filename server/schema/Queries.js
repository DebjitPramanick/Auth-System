const graphql = require('graphql')
const {UserType, AuthType} = require("./Types.js")

const  {GraphQLID, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLList, 
    GraphQLNonNull,
    GraphQLObjectType
} = graphql


const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parents, args){

            }
        }
    }
})


modules.exports = Query