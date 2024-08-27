
const { MongoClient } = require("mongodb");

 class connect{
    user;
    port;
    #pass;
    #host;
    #cluster;


   static instance
   constructor()
   {
       if(typeof connect.instance === "object"){
           return connect.instance;
       }
       this.user = process.env.VITE_MONGO_USER;
       this.port = process.env.VITE_MONGO_PORT;
       this.#pass = process.env.VITE_MONGO_PWD;
       this.#host = process.env.VITE_MONGO_HOST;
       this.#cluster = process.env.VITE_MONGO_CLUSTER;
       

       this.#open();
       this.db = this.conexion.db('movis')
       connect.instance = this;
       return this;
   }
   set setPass(pass){
       this.#pass = pass
   }
   set setHost(host){
       this.#host = host
   }
   set setCluster(cluster){
       this.#cluster = cluster
   }

   get getPass(){
       return this.#pass
   }
   get getHost(){
       return this.#host
   }
   get getCluster(){
       return this.#cluster
   }

   async #open(){
    const uri = `${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/movis`; // Define la variable uri aquí
    this.conexion = new MongoClient(uri);
    console.log('URI de conexión:', uri); 
    await this.conexion.connect();    
}


   async reconnect(){
       await this.#open();
   }
   async close(){
       await this.conexion.close();
   }
}

module.exports = connect;