const { body } = require('express-validator');

exports.validarCrearSala = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('capacidad').notEmpty().withMessage('La capacidad es obligatoria').isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero positivo'),
    body('tipo').notEmpty().withMessage('El tipo es obligatorio'),
    body('precios').notEmpty().withMessage('Los precios son obligatorios').isObject().withMessage('Los precios deben ser un objeto')
];

exports.validarActualizarSala = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío si se proporciona'),
    body('capacidad').optional().isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero positivo si se proporciona'),
    body('tipo').optional().notEmpty().withMessage('El tipo no puede estar vacío si se proporciona'),
    body('precios').optional().isObject().withMessage('Los precios deben ser un objeto si se proporcionan')
];