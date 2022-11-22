const { check } = require('express-validator')

module.exports = [
    check('title')
        .exists()
        .notEmpty()
        .withMessage('El titulo es requerido'),

    check('description')
        .exists()
        .notEmpty()
        .withMessage('La descripción es requerida'),

    check('videoUrlCharter')
        .exists()
        .notEmpty()
        .withMessage('URL requerido'),

    check('seriesIdBelongs')
        .exists()
        .notEmpty()
        .withMessage('seriesIdBelongs requerido'),
]