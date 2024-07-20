const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const todoSchema = new mongoose.Schema({
    todoTitle: String,
    todoDescription: String,
    priority: String,
    status: String,
}, {collection: 'todos',
    versionKey: false
})

module.exports = mongoose.model('todo',todoSchema)