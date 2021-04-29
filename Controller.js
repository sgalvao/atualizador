const express = require('express')
const cors = require('cors')
const {updateFile} = require('./update')
const app = express()
app.use(cors())



app.get('/execute', (req,res)=>{
  const {file} = req.body;
  
  return  res.send(JSON.stringify({message: "Download Iniciado"}));
});


app.listen(3333 , (req,res) =>{
    console.log('Servidor Online na porta 3333 🚀🚀')
})