import React from 'react'

export default function Task({ task, deleteTaskHandler, addCompletedTaskHandler }) {
    return (
        <li draggable="true" className={'todo-item ' + task.priority.toLowerCase()}>
            <div className="card">
                <h3 className="todo-title">
                    <span className="action">
                        <i className="material-icons md-36 icon-delete" onClick={() => {deleteTaskHandler(task.key)}}>delete</i>
                        <i className="icon-checkbox-outline material-icons md-36 md-dark" onClick={() => {addCompletedTaskHandler(task.key)}}>check_box_outline_blank</i>
                        <i className="icon-checkbox material-icons md-36 md-light">check_box</i>
                    </span>
                    <span className="title">{task.title} </span></h3>
                <p className="todo-description">
                    {task.description} </p>
                <span className="todo-priority"> {task.priority} </span>
            </div>
        </li>
    )
}
