const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY


exports.generateAuthJwt = async (payload) =>{
    const {expires_in, ...params} = payload
    const token = jwt.sign(params,SECRET_KEY,{expiresIn: expires_in} )

if(!token){
    return false
}
return token
}