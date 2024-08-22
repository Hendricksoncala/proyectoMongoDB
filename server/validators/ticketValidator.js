const { body } = require('express-validator');

exports.validarCrearTicket = [
    body('funcionId').notEmpty().withMessage('El ID de la función es obligatorio').isMongoId().withMessage('El ID de la función debe ser un ObjectId válido'),
    body('clienteId').notEmpty().withMessage('El ID del cliente es obligatorio').isMongoId().withMessage('El ID del cliente debe ser un ObjectId válido'),
    body('asientoIds')
        .notEmpty().withMessage('La lista de asientos es obligatoria')
        .isArray({ min: 1 }).withMessage('La lista de asientos debe ser un array con al menos un elemento')
        .custom(value => {
            if (!value.every(id => ObjectId.isValid(id))) {
                throw new Error('Todos los IDs de asientos deben ser ObjectIds válidos');
            }
            return true;
        }),
    body('fechaCompra').notEmpty().withMessage('La fecha de compra es obligatoria').isISO8601().toDate().withMessage('La fecha de compra debe estar en formato ISO 8601'),
    body('metodoPago').notEmpty().withMessage('El método de pago es obligatorio')
];