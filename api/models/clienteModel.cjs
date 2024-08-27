const { ObjectId } = require("mongodb");
const connect = require("../helpers/connection.cjs");

const connection = new connect();
const db =  connection.conexion.db('movis'); 
const coleccionCliente = db.collection('cliente');


 class ClienteManager {
  static instance;
    constructor() {
      // No necesitas un constructor específico si no hay datos predeterminados.
    }
  
    /**
     * Crea un nuevo cliente en la base de datos y en MongoDB.
     *
     * @param {Object} datosCliente - Los datos del cliente.
     * @param {string} datosCliente.nombre - Nombre del cliente.
     * @param {string} datosCliente.email - Correo electrónico del cliente.
     * @param {string} datosCliente.telefono - Número de teléfono del cliente.
     * @param {boolean} datosCliente.tarjeta - Indica si el cliente tiene una tarjeta asociada.
     * @param {number|null} datosCliente.tarjeta_id - ID de la tarjeta asociada al cliente (si tiene_tarjeta es true).
     * @param {string} datosCliente.tipoUsuario - Tipo de usuario (estandar, VIP o administrador).
     * @param {string} datosCliente.password - Contraseña del cliente (debe estar hasheada).
     * @returns {Promise<InsertOneResult>} El resultado de la inserción del cliente en la base de datos.
     * @throws {Error} Si faltan datos obligatorios, el tipo de usuario no es válido o hay un error al crear el cliente en la base de datos o en MongoDB.
     */
    static async create({  
      nombre,  
      email,  
      telefono,  
      tarjeta,  
      tarjeta_id,  
      tipoUsuario,  
      password  
    }) {  
      try {  
        // Validación de datos  
        if (!nombre || !email || !telefono || tarjeta === undefined || tipoUsuario === undefined || !password) {  
          throw new Error('Faltan datos obligatorios para crear el cliente');  
        }  

        // Verificar si el usuario ya existe  
        const existingUser = await coleccionCliente.findOne({ email });  
        if (existingUser) {  
          throw new Error('El usuario ya existe');  
        }  

        // Asignar null a tarjeta_id si no tiene tarjeta  
        if (!tarjeta) {  
          tarjeta_id = null;  
        }  

        const newCliente = {  
          nombre,  
          email,  
          telefono,  
          tarjeta,  
          tarjeta_id,  
          tipoUsuario  
        };  

        // Crear el cliente en la colección "clientes"  
        let create = await coleccionCliente.insertOne(newCliente);  

        // Asignar el rol correspondiente según el tipo de usuario  
        let rol;  
        if (tipoUsuario === 'estandar') {  
          rol = 'usuarioEstandar';  
        } else if (tipoUsuario === 'VIP') {  
          rol = 'usuarioVip';  
        } else if (tipoUsuario === 'administrador') {  
          rol = 'administrador';   
        } else {  
          throw new Error('Tipo de usuario no válido');  
        }  

        // Crear el usuario en MongoDB y asignarle el rol  
        await db.command({  
          createUser: nombre,  
          pwd: String(password),  
          roles: [{ role: rol, db: "movis" }]  
        });  

        return create;  
      } catch (error) {  
        console.error('Error al crear el cliente:', error.message);  
        throw error;  
      }  
    }  
  
    /**
     * Obtiene un cliente de la base de datos por su ID.
     *
     * @param {Object} params - Parámetros de la consulta.
     * @param {ObjectId} params._id - El ID del cliente a buscar.
     * @returns {Promise<Object|null>} El documento del cliente encontrado o null si no se encuentra.
     * @throws {Error} Si el ID del cliente no es válido o si ocurre un error al buscar el cliente en la base de datos
     */
    static async get({ _id }) {
      try {
        // Validar que el _id sea un ObjectId válido
        if (!ObjectId.isValid(_id)) {
          throw new Error('ID de cliente inválido');
        }
  
        let usuario = await coleccionCliente.findOne({ _id: new ObjectId(_id) });
        if (!usuario) {
          throw new Error(`Cliente con ID ${_id} no encontrado`);
        }
        return usuario;
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
        throw error;
      }
    }
  
    /**
     * Actualiza los datos de un cliente existente en la base de datos.
     *
     * @param {Object} datosCliente - Los datos del cliente a actualizar.
     * @param {ObjectId} datosCliente._id - El ID del cliente a actualizar (obligatorio).
     * @param {string} [datosCliente.nombre] - Nuevo nombre del cliente (opcional).
     * @param {string} [datosCliente.email] - Nuevo correo electrónico del cliente (opcional).
     * @param {string} [datosCliente.telefono] - Nuevo número de teléfono del cliente (opcional).
     * @param {boolean} [datosCliente.tarjeta] - Indica si el cliente tiene una tarjeta asociada (opcional).
     * @param {number} [datosCliente.tarjeta_id] - Nuevo ID de la tarjeta asociada al cliente (opcional).
     * @param {string} [datosCliente.tipoUsuario] - Nuevo tipo de usuario (opcional).
     * @returns {Promise<UpdateResult>} El resultado de la actualización del cliente en la base de datos.
     * @throws {Error} Si el ID del cliente no es válido, si no se encuentra el cliente o si ocurre un error al actualizar.
     */
    static async update({
      _id,
      nombre,
      email,
      telefono,
      tarjeta,
      tarjeta_id,
      tipoUsuario
    }) {
      try {
        // Validar que el _id sea un ObjectId válido
        if (!ObjectId.isValid(_id)) {
          throw new Error('ID de cliente inválido');
        }
  
        const updateData = {};
        if (nombre) updateData.nombre = nombre;
        if (email) updateData.email = email;
        if (telefono) updateData.telefono = telefono;
        if (tarjeta !== undefined) updateData.tarjeta = tarjeta;
  
        // Lógica para actualizar tarjeta_id
        if (tarjeta !== undefined) {
          updateData.tarjeta_id = tarjeta ? tarjeta_id : null;
        } else if (tarjeta_id) { // Si solo se proporcionó tarjeta_id
          updateData.tarjeta_id = tarjeta_id;
        }
  
        if (tipoUsuario) updateData.tipoUsuario = tipoUsuario;
  
        let usuario = await coleccionCliente.updateOne(
          { _id: new ObjectId(_id) },
          { $set: updateData }
        );
  
        if (usuario.matchedCount === 0) {
          throw new Error("No se encontró ningún cliente con ese ID");
        }
  
        return usuario;
      } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        throw error;
      }
    }
  
    /**
     * Obtiene todos los clientes que tengan el rol especificado.
     *
     * @param {Object} params - Parámetros de la consulta.
     * @param {string} params.tipoUsuario - El rol de los clientes a buscar ('estandar', 'VIP' o 'administrador').
     * @returns {Promise<Array>} Un array con los clientes que coinciden con el rol especificado.
     * @throws {Error} Si ocurre un error al obtener los usuarios por rol.
     */
    static async getByRol({ tipoUsuario } = { tipoUsuario: 'estandar' }) {
      try {
        let usuario = await coleccionCliente.find({ tipoUsuario }).toArray();
        console.log('Usuarios filtrados por rol:');
        console.log(usuario);
        return usuario;
      } catch (error) {
        console.error('Error al obtener usuarios por rol:', error);
        throw error;
      }
    }
  
    /**
     * Obtiene todos los clientes de la base de datos.
     *
     * @returns {Promise<Array>} Un array con todos los clientes de la base de datos.
     * @throws {Error} Si ocurre un error al obtener todos los usuarios
     */
    static async getAll() {
      try {
        let usuario = await coleccionCliente.find({}).toArray();
        console.log('Todos los usuarios:');
        console.log(usuario);
        return usuario;
      } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        throw error;
      }
    }
  }

  module.exports = ClienteManager; 