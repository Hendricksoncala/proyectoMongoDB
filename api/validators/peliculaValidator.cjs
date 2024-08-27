const { body } = require('express-validator');

exports.validarCrearPelicula = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('genero').notEmpty().withMessage('El género es obligatorio'),
    body('duracion').isInt({ min: 1 }).withMessage('La duración debe ser un número entero positivo'),
    body('sinopsis').notEmpty().withMessage('La sinopsis es obligatoria'),
    body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida'),
    body('trailer').optional().isURL().withMessage('El tráiler debe ser una URL válida'),
    body('reparto').optional().isArray().withMessage('El reparto debe ser un array')
];

exports.validarActualizarPelicula = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío si se proporciona'),
    body('genero').optional().notEmpty().withMessage('El género no puede estar vacío si se proporciona'),
    body('duracion').optional().isInt({ min: 1 }).withMessage('La duración debe ser un número entero positivo si se proporciona'),
    body('sinopsis').optional().notEmpty().withMessage('La sinopsis no puede estar vacía si se proporciona'),
    body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida si se proporciona'),
    body('trailer').optional().isURL().withMessage('El tráiler debe ser una URL válida si se proporciona'),
    body('reparto').optional().isArray().withMessage('El reparto debe ser un array si se proporciona')
];