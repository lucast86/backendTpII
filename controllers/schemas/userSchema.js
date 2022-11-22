const { check } = require('express-validator')

module.exports = [
    check('email')
        .exists()
        .notEmpty()
        .withMessage('El email es requerido.')
        .custom((value, { req }) => value.includes("@") && value.includes(".com"))
        .withMessage('El email ingresado no es valido debe contener @ y .com'),

    check('password')
        .exists()
        .notEmpty()
        .withMessage('El password es requerido.')
        .isLength({min: 6})
        .withMessage('La clave debe contener al menos 6 caracteres.')
]