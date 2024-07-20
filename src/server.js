///if any error try the below:
// npm uninstall mongoose
// npm install mongoose@6.10.0

import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/TodoListDB', {
    dbName: 'TodoListDB',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to Todos database'));


const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function () {

  const collection  = connection.db.collection("todos");
  collection.find({}).toArray(function(err, data){
      console.log(data); // it will print your collection data
  });
});

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// // console.log("App listen at port 5000");
// const app=express()
// app.use(cors())
// app.use(express.json())

// app.get("/", (req, resp) => {
 
//     resp.send("App is Working");
//     // You can check backend is working or not by 
//     // entering http://localhost:5000
     
//     // If you see App is working means
//     // backend working properly
// });
// app.listen(5001, () =>{
//     console.log("Server is running at 5000")
// });