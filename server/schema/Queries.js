const graphql = require('graphql')
const { UserType, AuthType } = require("./Types.js")
const User = require("../models/User.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} = graphql


const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login: {
            type: AuthType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parents, args) {
                let query = await User.findOne({ email: args.email })
                if (!query) {
                    throw new Error('User does not exist.')
                }
                else {
                    let isEqual = await bcrypt.compare(args.password, query.password)
                    if (!isEqual) {
                        throw new Error('Password is incorrect.')
                    }
                    else {
                        const accessToken = await jwt.sign({ id: query._id, email: query.email }, 'accessToken', {
                            expiresIn: '60s'
                        })
                        const refreshToken = await jwt.sign({ id: query._id, email: query.email }, 'refreshToken', {
                            expiresIn: '7d'
                        })
                        return {
                            id: query._id,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            accesstokenExp: '60s',
                            refreshtokenExp: '7d',
                        }
                    }
                }
            }
        }
    }
})


module.exports = Query