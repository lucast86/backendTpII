const { authService } = require("../services")

const isAuth = (req, res, next) => {
    
        if(!req.headers.authorization){
            return res.status(401).send({ message: "El usuario no esta logueado!"})
        }

        const token = req.headers.authorization.split(" ")[1]

        authService.decoteToken(token).then((result) => {
            req.user = result
            if(result === undefined) return res.status(401).send({ message: "El usuario no esta logueado!"})
            next()
        }).catch((error) => {
            return res.status(500).send({ message: "Se produjo un error al validar el token"})
        })
}

        
module.exports = isAuth