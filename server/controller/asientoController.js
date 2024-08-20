const AsientoManager = require('../models/asientoModel');

exports.reservarAsientos = async (req, res) => {
    try {
        const funcionId = new ObjectId(req.params.funcionId); // Obtén el ID de la función de la solicitud
        const asientosIds = req.body.asientosIds.map(id => new ObjectId(id)); // Obtén los IDs de los asientos y conviértelos a ObjectId

        const asientoManager = new AsientoManager();
        await asientoManager.reservarAsientos(funcionId, asientosIds);
        res.status(200).json({ message: 'Asientos reservados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelarReservaAsientos = async (req, res) => {
    try {
        const funcionId = new ObjectId(req.params.funcionId); 
        const asientosIds = req.body.asientosIds.map(id => new ObjectId(id));

        const asientoManager = new AsientoManager();
        await asientoManager.cancelarReserva(funcionId, asientosIds);
        res.status(200).json({ message: 'Reserva de asientos cancelada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerInformacionSala = async (req, res) => {
    try {
        const salaId = new ObjectId(req.params.salaId); 
        const asientoManager = new AsientoManager();
        const informacionSala = await asientoManager.getAll(salaId);
        res.status(200).json(informacionSala);
    } catch (error) {
        res.status(404).json({ error: error.message }); // O 500 si es un error interno del servidor
    }
};