const graphql = require('graphql')
const { UserType, AuthType } = require("./Types.js")
const User = require("../models/User.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isAuth = require('../middleware/isAuth.js')

const { GraphQLID,
    GraphQLString,
    GraphQLInt,
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
                        const accessToken = await jwt.sign({ email: query.email }, 'accessToken', {
                            expiresIn: '20s'
                        })
                        const refreshToken = await jwt.sign({ email: query.email }, 'refreshToken', {
                            expiresIn: '7d'
                        })
                        return {
                            username: query.username,
                            email: query.email,
                            age: query.age,
                            userID: query._id, 
                            accessToken: accessToken, 
                            refreshToken: refreshToken,
                            accessTokenExp: query.accessTokenExp,
                            refreshTokenExp: query.refreshTokenExp
                        }
                    }
                }
            }
        },

        getUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID}
            },
            async resolve(parent, args, req){
                if(!req.isAuth){
                    throw new Error("Unauthenticated user!")
                }
                else{
                    let user = await User.findById(args.id)
                    return user
                }
            }
        }
    }
})


module.exports = Query