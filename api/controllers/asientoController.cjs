const AsientoManager = require('../models/asientoModel.cjs');
const { ObjectId } = require("mongodb");
const { validationResult } = require('express-validator');
const asientoValidator = require('../validators/asientoValidator.cjs');

/**
 * Reserva los asientos especificados para una función.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la reserva o un mensaje de error en caso de fallo.
 */
exports.reservarAsientos = async (req, res) => {
    try {
      // ... validaciones 
  
      const funcionId = new ObjectId(req.params.funcionId);
      const asientosSeleccionados = req.body.asientos; // Array de objetos { numero, fila, categoria }
  
      // Crear los asientos reservados (agrega funcion_id y estado)
      const asientosReservados = await Asiento.insertMany(
        asientosSeleccionados.map(asiento => ({
          ...asiento, 
          funcion_id: funcionId,
          estado: 'reservado'
        }))
      );
  
      const asientosReservadosIds = asientosReservados.map(asiento => asiento._id);
  
      await Funcion.findByIdAndUpdate(funcionId, {
        $push: { asientos_ocupados: { $each: asientosReservadosIds } }
      });
  
      res.status(201).json({ message: 'Asientos reservados correctamente', asientos: asientosReservados });
    } catch (error) {
      // ... manejo de errores
    }
  };
/**
 * Cancela la reserva de los asientos especificados para una función.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la cancelación o un mensaje de error en caso de fallo.
 */
exports.cancelarReservaAsientos = async (req, res) => {
    try {
        // Aplicar las validaciones para cancelar reserva de asientos
        await Promise.all(asientoValidator.validarCancelarReservaAsientos.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const funcionId = new ObjectId(req.params.funcionId); 
        const asientosIds = req.body.asientosIds.map(id => new ObjectId(id)); 

        const asientoManager = new AsientoManager();
        await asientoManager.cancelarReserva(funcionId, asientosIds);
        res.status(200).json({ message: 'Reserva de asientos cancelada correctamente' });
    } catch (error) {
        // Manejo de errores más específico
        if (error.message.includes('no reservado')) {
            res.status(400).json({ error: error.message }); // Asiento no reservado
        } else if (error.message.includes('Datos de cancelación inválidos')) {
            res.status(400).json({ error: error.message }); // Datos inválidos
        } else {
            res.status(500).json({ error: 'Error interno del servidor al cancelar la reserva' }); 
        }
    }
};

/**
 * Obtiene información sobre una sala, incluyendo detalles de la sala, cantidad de asientos ocupados/reservados y cantidad de asientos disponibles.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la información de la sala o un mensaje de error en caso de fallo.
 */
exports.obtenerInformacionSala = async (req, res) => {
    try {
        const salaId = new ObjectId(req.params.salaId); 

        // Validación del ID de la sala
        if (!ObjectId.isValid(salaId)) {
            return res.status(400).json({ error: 'ID de sala inválido' });
        }

        const asientoManager = new AsientoManager();
        const informacionSala = await asientoManager.getAll(salaId);
        res.status(200).json(informacionSala);
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message }); 
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener información de la sala' }); 
        }
    }
};