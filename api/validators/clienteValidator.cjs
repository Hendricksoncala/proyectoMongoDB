const { check, body } = require('express-validator');

exports.validarCrearCliente = [
  // Validaciones para crear un cliente
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('El correo electrónico debe ser válido'),
  body('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isMobilePhone().withMessage('El número de teléfono debe ser válido'),
  body('tarjeta').isBoolean().withMessage('El campo "tarjeta" debe ser verdadero o falso'),
  body('tipoUsuario')
    .notEmpty().withMessage('El tipo de usuario es obligatorio')
    .isIn(['estandar', 'VIP', 'administrador']).withMessage('El tipo de usuario debe ser válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

exports.validarActualizarCliente = [
  // Validaciones para actualizar un cliente
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío si se proporciona'),
  body('email')
    .optional()
    .isEmail().withMessage('El correo electrónico debe ser válido si se proporciona'),
  body('telefono')
    .optional()
    .isMobilePhone().withMessage('El número de teléfono debe ser válido si se proporciona'),
  body('tarjeta').optional().isBoolean().withMessage('El campo "tarjeta" debe ser verdadero o falso si se proporciona'),
  body('tipoUsuario')
    .optional()
    .isIn(['estandar', 'VIP', 'administrador']).withMessage('El tipo de usuario debe ser válido si se proporciona')
];