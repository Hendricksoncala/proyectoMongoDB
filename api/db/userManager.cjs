import { MongoClient } from 'mongodb';  
import dotenv from 'dotenv';  

dotenv.config();  

class UserManager {  
  constructor() {  
    const {  
      VITE_MONGO_HOST,  
      VITE_MONGO_USER,  
      VITE_MONGO_PWD,  
      VITE_MONGO_CLUSTER,  
      VITE_MONGO_PORT,  
      VITE_MONGO_DB,  
    } = process.env;  

    this.uri = `${VITE_MONGO_HOST}${VITE_MONGO_USER}:${VITE_MONGO_PWD}@${VITE_MONGO_CLUSTER}:${VITE_MONGO_PORT}`;  

    this.client = new MongoClient(this.uri);  
    this.dbName = VITE_MONGO_DB;  
  }  

  async connect() {  
    await this.client.connect();  
    this.db = this.client.db(this.dbName);  
    console.log('Connected to MongoDB');
  }  

  async close() {  
    await this.client.close();  
    console.log('Disconnected from MongoDB');
  }  

  async createAdmin(username, password) {  
    await this.db.command({  
      createUser: username,  
      pwd: password,  
      roles: [
        { role: 'dbAdmin', db: this.dbName }, 
        { role: 'readWrite', db: this.dbName },
        { role: 'userAdminAnyDatabase', db: 'admin' },
        { role: 'dbAdminAnyDatabase', db: 'admin' }
      ],  
    });  
    console.log(`Usuario administrador ${username} creado.`);  
  }  

  
}  

export default UserManager;
