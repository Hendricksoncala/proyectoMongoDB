const express = require('express');
const app = express();
const path = require('path');


let port = 3000;

app.use(express.json());
app.use('/css', express.static(path.join(process.env.EXPRESS_STATIC, 'css')));
app.use('/js', express.static(path.join(process.env.EXPRESS_STATIC, 'js')));
app.use('/storage', express.static(path.join(process.env.EXPRESS_STATIC, 'storage')));



app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname,process.env.EXPRESS_STATIC,'index.html'))
})

app.get("/servicio", (req, res) =>{
    res.sendFile(path.join(__dirname,process.env.EXPRESS_STATIC,'views/servicio.html'))
})



app.use((res, req)=>{
    res.status(404).json({message: 'Not Found'})
})

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}
app.listen(config,()=>{
    console.log(`http://${config.host}:${config.port}`)
})

app.listen(port,()=>{
    console.log('http://localhost:3000')
})












// //get: Permite mostrar o traer la data
// app.get("/user", (req,res)=>{
//     res.status(200).json({message: 'Welcome to Campuslands... please scape when you can '})
    
// })
// //post: Permite crear data
// app.post("/user", (req,res)=>{
//     res.status(201).json({message: 'Resive Data :3 ', data: req.body})
//     console.log(req.body)
// })
// //delete: Elimina un dato creado
// app.delete("/user/:nombre", (req,res)=>{
//     res.status(201).json({message: 'Elimina Data :3 ', data: req.body})
// })
// //put: Actualizar un dato existente o crearlo si no existe.
// app.put("/user/:id", (req,res)=>{
//     res.status(201).json({message: 'Update Data :3 ', dataquery: req.query, databody: req.body, dataparams: req.params})
// })


