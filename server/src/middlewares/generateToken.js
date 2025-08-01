const jwt = require('jsonwebtoken')


const generateToken = id =>{
    return jwt.sign({id},process.env.JWT_Token,{expiresIn : '90d'})
}

module.exports = generateToken