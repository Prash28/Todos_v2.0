require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true, useNewUrlParser: true, useUnifiedTopology: true } };
const Todo = require('./src/models/todo.js')
const MongoClient = require('mongodb').MongoClient
const app=express()
app.use(cors())
app.use(express.json())

const uri=process.env.MONGO_URI;
console.log('Mongo URI:', process.env.MONGO_URI);
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!")
    

    // Start the server after the connection is established
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 4000")
    });
  } catch (err) {
    console.error(err)
  }
}

// Run the function to connect to the database and start the server
run()

app.get('/', async (req, res) => {
        res.send("This is todo root")
      });
    // Add your routes and middleware after the connection is established
    app.get('/getAllItems', async (req, res) => {
      try {
        const data = await Todo.find()
        res.json(data)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    });

app.post('/', (req,res) => {
    const newTask = new Todo({
        todoTitle: req.body.todoTitle,
        todoDescription: req.body.todoDescription,
        priority:req.body.priority,
        status:req.body.status
    })
    newTask.save()
    res.send("New task added!")
})

app.delete('/deleteTodo/:id', async (req,res) => {
  try{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ObjectId' });
    }
    await Todo.findByIdAndDelete(id);
    res.status(200).send({message: "Todo item deleted"})
  } catch(err){
    res.status(500).send({message: "Error in deleting", err})
  }
})

app.put('/updateTodo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { todoTitle, todoDescription, priority, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ObjectId' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        todoTitle,
        todoDescription,
        priority,
        status,
      },
      { new: true } // This option returns the modified document rather than the original.
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: 'Todo item not found' });
    }

    res.status(200).send({ message: 'Todo item updated', updatedTodo });
  } catch (err) {
    res.status(500).send({ message: 'Error in updating', err });
  }
});