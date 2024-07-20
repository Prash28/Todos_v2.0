import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onRequestClose, todo, handleUpdateItem }) => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
  
    useEffect(() => {
      if (todo) {
        setTodoTitle(todo.todoTitle);
        setTodoDescription(todo.todoDescription);
        setPriority(todo.priority);
        setStatus(todo.status);
      }
    }, [todo]);
  
    const handleSave = () => {
      handleUpdateItem(todo._id, { todoTitle, todoDescription, priority, status });
      onRequestClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="edit-modal-overlay">
        <div className="edit-modal-container">
          <h2>Edit Todo</h2>
          <form>
            <div>
              <label>Title</label>
              <input 
                type="text" 
                value={todoTitle} 
                onChange={(e) => setTodoTitle(e.target.value)} 
              />
            </div>
            <div>
              <label>Description</label>
              <input 
                type="text" 
                value={todoDescription} 
                onChange={(e) => setTodoDescription(e.target.value)} 
              />
            </div>
            <div>
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={onRequestClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
  };

export default EditModal;
