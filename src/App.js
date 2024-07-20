import React,{Component} from 'react';
import './App.css';
import {useState, useEffect} from "react"
import ListComponent from "./components/ListComponent";
import EditModal from './components/EditModal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todos, setTodos] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const [isEditClicked, setIsEditClicked] = useState(true)
    const [currentTodo, setCurrentTodo] = useState(null);

    const fetchData = async () => {
      await fetch('http://localhost:4002/getAllItems')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err))
  }

    useEffect(() =>{
      if(!isFetched){
        fetchData();
      console.log(todos);
      setIsFetched(true);
      }
    }, [isFetched]);
    const addTaskToDB = async (task, status, priority) => {
      console.log("to be added")
      console.log(JSON.stringify({
        todoTitle: task,
        todoDescription: "Sleeeep",
        priority: "Medium",
        status: status,
      }))
      await fetch('http://localhost:4002/',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          todoTitle: task,
          todoDescription: "Dummy Description",
          priority: priority,
          status: status,
        })
      })
      setIsFetched(false)
    }
    const handleAddItem = (task, status, priority) => {
      console.log("indisde fn")
      console.log("in app.js")
      addTaskToDB(task, status, priority)
    }
    const handleDeleteItem = async id => {
      await fetch(`http://localhost:4002/deleteTodo/${id}`, {
        method: 'DELETE',
      });
      setIsFetched(false); // Refresh the data
    };
    const updateTaskInDB = async (id, updatedTask) => {
      await fetch(`http://localhost:4002/updateTodo/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
      setIsFetched(false);
    }
    const handleUpdateItem = (id, updatedTask) => {
      updateTaskInDB(id, updatedTask);
    }
    const openModal = (todo) => {
      setCurrentTodo(todo);
      setIsModalOpen(true);
    }
    const closeModal = () => {
      setIsModalOpen(false);
      setCurrentTodo(null);
    };
  return (
    <div className="App">
      <header className="header">Todos App</header>
      <ListComponent todos={todos} handleAddItem={handleAddItem} 
      handleDeleteItem={handleDeleteItem} openModal={openModal}
      />
      <EditModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        todo={currentTodo}
        handleUpdateItem={handleUpdateItem}
      />
    </div>
  )
}
// }

export default App
