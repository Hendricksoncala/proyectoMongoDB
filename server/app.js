const express = require('express');
const app = express();

// Configuración de middlewares (si es necesario)
app.use(express.json()); // Para analizar el cuerpo de las solicitudes JSON

// Conexión a la base de datos (puedes usar tu archivo database.js aquí)
const connect = require("./helpers/connection.js");
const connection = new connect();
connection.connect() 
  .then(() => {
    console.log('Conectado a la base de datos');

    // Importar y montar los routers
    const clienteRouter = require('./routers/clienteRouter');
    const peliculaRouter = require('./routers/peliculaRouter');
    const ticketRouter = require('./routers/ticketRouter');
    const asientoRouter = require('./routers/asientoRouter');

    app.use('/api/clientes', clienteRouter);
    app.use('/api/peliculas', peliculaRouter);
    app.use('/api/tickets', ticketRouter);
    app.use('/api/asientos', asientoRouter);

    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });