const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(8000, () => console.log("Sever is running..."))
app.get('/', (req,res) => res.send("Auth system..."))