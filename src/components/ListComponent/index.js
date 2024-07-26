import React from "react";
import { useState } from "react";
import ListItem from '../ListItem/'
import './index.css'

const ListComponent = ({todos, handleAddItem, handleDeleteItem, openModal, handleFilter, errMessage, setErrorMessage, noData}) => {
    const [newTask, setNewTask] = useState("")
    const [newStatus, setNewStatus] = useState("")
    const [newPriority, setNewPriority] = useState("")
    // const [displayStatus, setDisplayStatus] = useState("all")

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

    const onChangeDisplayStatus = (event) => {
      handleFilter(event.target.value);
    }
    const setErrMsg = () => {
      setErrorMessage(true)
    }
    
    return(
        <div className="todos-container">
        <div className="add-todo-container">
          <div className="add-todo-content">
            <input type="text" name="newTodo" className="input-text" 
            onChange={onChangeInput} placeholder="Enter task name..." onClick={setErrMsg}></input>
          <div className="add-todo-options">
          <select className="newTaskPriorityDropdown" onChange={onChangePriority} >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="newTaskStatusDropdown" onChange={onChangeStatus} >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button type="button" className="add-todo-button"
          onClick={onAddTask}
          >+ Add Task</button>
          </div>
          </div>
          {errMessage && (
          <span className="err-msg">*Enter required fields</span>
          )}
        </div>
        <div className="todos-main-container">
          <div className="todos-filter-container">
          <select className="filterTaskDropdown" onChange={onChangeDisplayStatus} >
          <option>All</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          </div>
          
        <div className="todos-card-container">
          {todos.map((list, index) => { 
            return(
              <ListItem key={index} item={todos[index]} handleDeleteItem={handleDeleteItem} openModal={openModal} />
            ) 
          })}
          
        </div>
        {todos.length===0 && <p className="nothing-display">Nothing to display</p>}
        </div>
      </div>
    )
    
}

export default ListComponent;