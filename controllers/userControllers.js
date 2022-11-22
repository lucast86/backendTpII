const { userService } = require('../services')
const { validationResult } = require('express-validator')

const register = async (req, res) => {
    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const { email, password } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }

        const registeredUser = await userService.register(email, password).catch()
        res.status(200).send(registeredUser)
    }catch(error){
        res.status(500).send(error)
    }
    
    
}

const login = async (req, res) => {
    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const { email, password } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }

        const userLoggedIn = await userService.login(email, password)
        res.status(200).send(userLoggedIn)
    }catch(error){
        res.status(500).send(error)
    }
   
}


module.exports = { login, register }
