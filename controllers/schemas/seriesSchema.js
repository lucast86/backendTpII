const { check } = require('express-validator')

module.exports = [
    check('title')
        .exists()
        .notEmpty()
        .withMessage('El titulo es requerido.'),

    check('description')
        .exists()
        .notEmpty()
        .withMessage('La descripción es requerida.'),

    check('coverImageUrl')
        .exists()
        .notEmpty()
        .withMessage('URL de la imagen requerida.'),

    check('category')
        .exists()
        .notEmpty()
        .withMessage('La Categoria es requerida'),
]