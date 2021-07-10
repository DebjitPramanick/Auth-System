const graphql = require('graphql')
const { UserType, AuthType } = require("./Types.js")
const bcrypt = require('bcryptjs')
const User = require("../models/User.js")
const verifyToken = require('../middleware/verifyToken.js')
const jwt = require('jsonwebtoken')

const { GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} = graphql

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                let query = await User.findOne({ email: args.email })
                if (query) {
                    throw new Error('User already exists.')
                }
                else {
                    let uname = args.email.split('@')[0]
                    let passHash = await bcrypt.hash(args.password, 12)

                    const accessToken = await jwt.sign({ email: args.email }, 'accessToken', {
                        expiresIn: '1h'
                    })
                    const refreshToken = await jwt.sign({ email: args.email }, 'refreshToken', {
                        expiresIn: '7d'
                    })

                    let user = new User({
                        username: uname,
                        email: args.email,
                        password: passHash,
                        age: args.age,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        accessTokenExp: '1h',
                        refreshTokenExp: '7d',
                    })
                    let res = await user.save()
                    return res
                }
            }
        },

        generateToken: {
            type: UserType,
            args: {
                refreshToken: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                if (!args.refreshToken) {
                    throw new Error("Not a refresh token.")
                }
                else {
                    let userEmail = await verifyToken(args.refreshToken)
                    let user = await User.findOne({ email: userEmail })
                    const accessToken = await jwt.sign({ email: user.email }, 'accessToken', {
                        expiresIn: '20s'
                    })
                    const refreshToken = await jwt.sign({ email: user.email }, 'refreshToken', {
                        expiresIn: '7d'
                    })
                    return {
                        username: user.username,
                        email: user.email,
                        age: user.age,
                        userID: user._id,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        accessTokenExp: user.accessTokenExp,
                        refreshTokenExp: user.refreshTokenExp
                    }
                }
            }
        }
    }
})

module.exports = Mutation