import React from "react";
import { useState } from "react";
import ListItem from '../ListItem/'
import './index.css'

const ListComponent = ({todos, handleAddItem, handleDeleteItem, openModal}) => {
    const [newTask, setNewTask] = useState("")
    const [newStatus, setNewStatus] = useState("")
    const [newPriority, setNewPriority] = useState("")

    const onChangeInput = event =>{
      setNewTask(event.target.value)
    }
    const onChangeStatus = event => {
      setNewStatus(event.target.value)
    }
    const onChangePriority = event => {
      setNewPriority(event.target.value)
    }
    const onAddTask = () => {
      console.log("in addtask fn")
      handleAddItem(newTask,newStatus,newPriority);
    };
    
    return(
        <div className="todos-container">
        <div className="add-todo-container">
          <div className="add-todo-content">
          <input type="text" name="newTodo" className="input-text" onChange={onChangeInput} placeholder="Enter task name..."></input>
          <div className="add-todo-options">
          <select className="newTaskPriorityDropdown" onChange={onChangePriority} >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="newTaskStatusDropdown" onChange={onChangeStatus} >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button type="button" className="add-todo-button"
          onClick={onAddTask}
          >+ Add Task</button>
          </div>
          </div>
        </div>
        <div className="todos-main-container">
        <div className="todos-card-container">
        {todos.map((list, index) => { 
            return(
              <ListItem key={index} item={todos[index]} handleDeleteItem={handleDeleteItem} openModal={openModal}/>
            ) 
          })}
        </div>       
        </div>
      </div>
    )
    
}

export default ListComponent;