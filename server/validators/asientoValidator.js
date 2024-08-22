const { check, body } = require('express-validator');

exports.validarReservarAsientos = [
    body('funcionId').notEmpty().withMessage('El ID de la función es obligatorio').isMongoId().withMessage('El ID de la función debe ser un ObjectId válido'),
    body('asientosIds')
        .notEmpty().withMessage('La lista de asientos es obligatoria')
        .isArray().withMessage('La lista de asientos debe ser un array')
        .custom(value => {
            if (!value.every(id => ObjectId.isValid(id))) {
                throw new Error('Todos los IDs de asientos deben ser ObjectIds válidos');
            }
            return true;
        })
];

exports.validarCancelarReservaAsientos = [
    body('funcionId').notEmpty().withMessage('El ID de la función es obligatorio').isMongoId().withMessage('El ID de la función debe ser un ObjectId válido'),
    body('asientosIds')
        .notEmpty().withMessage('La lista de asientos es obligatoria')
        .isArray().withMessage('La lista de asientos debe ser un array')
        .custom(value => {
            if (!value.every(id => ObjectId.isValid(id))) {
                throw new Error('Todos los IDs de asientos deben ser ObjectIds válidos');
            }
            return true;
        })
];