import React from "react";
import './index.css'

const ListItem = ({item, handleDeleteItem, openModal}) => {

    return(
        <div className="todos-container">
            <div className="todo-card">
                <p className="todo-card-title">{item.todoTitle}</p>
                <div className="todo-card-details">
                <p>{item.priority}</p>
                <p>{item.status}</p>
                </div>
                <div className="todo-card-modify">
                <button type="button" className="todo-card-delete" 
                onClick={() => handleDeleteItem(item._id)}>
                    Delete</button>
                    <button type="button" className="todo-card-edit" 
                onClick={() => openModal(item)}>
                    Edit</button>
                </div>
            </div>
      </div>
    ) 
}

export default ListItem;
      