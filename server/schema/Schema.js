const graphql = require('graphql')
const Query = require('./Queries.js')
const Mutation = require('./Mutation.js')

const {GraphQLSchema} = graphql

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})