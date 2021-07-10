const jwt = require('jsonwebtoken')

module.exports = (token) => {
    let decodeToken;
    try{
        decodeToken = jwt.verify(token, 'refreshToken')
    }
    catch(err){
        throw new Error("Unauthorized!")
    }

    let id = decodeToken.id
    return id
}