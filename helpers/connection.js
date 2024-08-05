import 'dotenv/config'
import { MongoClient } from "mongodb";

export class connect{
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
       this.user = process.env.MONGO_USER;
       this.port = process.env.MONGO_PORT;
       this.#pass = process.env.MONGO_PWD;
       this.#host = process.env.MONGO_HOST;
       this.#cluster = process.env.MONGO_CLUSTER;
       

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
       this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/movis`);
       await this.conexion.connect();

       
   }


   async reconnect(){
       await this.#open();
   }
   async close(){
       await this.conexion.close();
   }
}