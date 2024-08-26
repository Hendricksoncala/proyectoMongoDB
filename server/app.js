const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Configuración de middlewares 
app.use(express.json()); 

// Configuración de CORS antes de las rutas
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes solo desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite estos métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'] // Permite estos encabezados
}));

// Conexión a la base de datos 
const Connect = require("./helpers/connection.js");
const connection = new Connect(); 

const db = connection.conexion.db('movis'); 

console.log('Conectado a la base de datos'); 

// Importar y montar los routers
const clienteRouter = require('./routers/clienteRouter');
const peliculaRouter = require('./routers/peliculaRouter');
const ticketRouter = require('./routers/ticketRouter');
const asientoRouter = require('./routers/asientoRouter');
const salaRouter = require('./routers/salaRouter');
const funcionRouter = require('./routers/funcionRouter');

app.use('/api/clientes', clienteRouter);
app.use('/api/peliculas', peliculaRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/asientos', asientoRouter);
app.use('/api/salas', salaRouter); 
app.use('/api/funciones', funcionRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});