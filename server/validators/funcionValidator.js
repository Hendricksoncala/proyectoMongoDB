const { body } = require('express-validator');

exports.validarCrearFuncion = [
    body('peliculaId').notEmpty().withMessage('El ID de la película es obligatorio').isMongoId().withMessage('El ID de la película debe ser un ObjectId válido'),
    body('salaId').notEmpty().withMessage('El ID de la sala es obligatorio').isMongoId().withMessage('El ID de la sala debe ser un ObjectId válido'),
    body('fecha').notEmpty().withMessage('La fecha es obligatoria').isISO8601().toDate().withMessage('La fecha debe estar en formato ISO 8601'),
    body('hora').notEmpty().withMessage('La hora es obligatoria').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('La hora debe estar en formato HH:mm'),
    body('precio').notEmpty().withMessage('El precio es obligatorio').isNumeric().withMessage('El precio debe ser un número')
];

exports.validarActualizarFuncion = [
    body('peliculaId').optional().isMongoId().withMessage('El ID de la película debe ser un ObjectId válido si se proporciona'),
    body('salaId').optional().isMongoId().withMessage('El ID de la sala debe ser un ObjectId válido si se proporciona'),
    body('fecha').optional().isISO8601().toDate().withMessage('La fecha debe estar en formato ISO 8601 si se proporciona'),
    body('hora').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('La hora debe estar en formato HH:mm si se proporciona'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número si se proporciona')
];