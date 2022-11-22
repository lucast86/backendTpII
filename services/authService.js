const jwt = require('jwt-simple')
const { DateTime } = require('luxon')
const User = require('../models/user')

const createToken = (user) => {
    const payload = {
        sub: user.id,
        iat: DateTime.now().toMillis(),
        exp: DateTime.now().plus({ day: 14}).toMillis()
    };
    return jwt.encode(payload, process.env.SECRET_TOKEN)
}

const decoteToken = async (token) => {
    try{
        const payload = jwt.decode(token, process.env.SECRET_TOKEN);

        const result = await User.findById(payload.sub)

        if(result){
             if(payload.exp <= DateTime.now().toMillis()){
                return {status: 401, message: "el token a expirado" }
            }
            return payload.sub
        }
        
    }catch(error){
        throw error
    }
}

module.exports = {
    createToken,
    decoteToken,
}