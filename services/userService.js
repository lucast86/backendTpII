const authService = require('./authService')
const User = require('../models/user')

const register = (email, password) => {

    return new Promise((resolve, reject) => {

        const newUser = new User({ email, password })
            
        User.findOne({email: newUser.email}, (error, user) => {
            if(error)      reject({ status:500, message: `Se produjo un error al registrar un usuario ${error}`})
            if(user)       reject({ status:403, message: `El email ya se encuentra en uso.`})
    
            newUser.save((error) => {
                if(error)  reject({ status:500, message: `Se produjo un error al registrar un usuario ${error}`})
                resolve({status: 200, message: "El usuario fue creado exitosamente", newUser})
            })
        })
    })
}

const login = (email, password) => {

    return new Promise((resolve, reject) => {

        User.findOne({ email }, (error, user) => {
            if(error)  reject({status:500, message:`Se produjo un error  ${error}`})
            if(!user)  return reject({status:404, message: `No se encontro el usuario con el email ingresado.`})
            if(!(password && user.comparePassword(password))){
                reject({status:401, message: `El usuario o la clave son incorrectos.`})
            }
            resolve({status: 200, message: "Te has logueado correctamente", token: authService.createToken(user)})
        })
    })
}

module.exports = {
    register,
    login,
}