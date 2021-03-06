const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require("./schema/Schema.js")
const isAuth = require('./middleware/isAuth.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(isAuth)

const mongoURL = 'mongodb+srv://admin-debjit:Q8PS2rR2UhCHUpW@cluster0.u0mvg.mongodb.net/userDB?retryWrites=true&w=majority'
mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => console.log("DB Connected..."))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8000, () => console.log("Sever is running..."))
app.get('/', (req,res) => res.send("Auth system..."))