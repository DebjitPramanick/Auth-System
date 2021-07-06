const graphql = require('graphql')
const { UserType, AuthType } = require("./Types.js")
const bcrypt = require('bcryptjs')
const User = require("../models/User.js")

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
                    let user = new User({
                        username: uname,
                        email: args.email,
                        password: passHash,
                        age: args.age
                    })
                    let res = await user.save()
                    return res
                }
            }
        }
    }
})

module.exports = Mutation