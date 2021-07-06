const jwt = require('jsonwebtoken')

module.exports = (req,res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false;
        return next()
    }

    let token = authHeader.split(' ')[1]
    if(!token || token === ''){
        req.isAuth = false
        return next()
    }

    let decodeToken;

    try{
        decodetoken = jwt.verify(token, 'accessToken')
    }
    catch(err){
        req.isAuth = false;
        return next()
    }

    req.isAuth = true
    req.id = decodeToken.id
    next()
}